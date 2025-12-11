import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import { RegisterPaymentDto } from './dto/register-payment.dto';

@Injectable()
export class PaymentService {
  private readonly satimConfig = {
    baseUrl: process.env.SATIM_BASE_URL || '',
    registerUrl: process.env.SATIM_REGISTER_URL || '',
    confirmUrl: process.env.SATIM_CONFIRM_URL || '',
    userName: process.env.SATIM_USERNAME || '',
    password: process.env.SATIM_PASSWORD || '',
    currency: '012',
    returnUrl: process.env.PAYMENT_RETURN_URL || '',
    failUrl: process.env.PAYMENT_FAIL_URL || '',
    jsonParams: {
      force_terminal_id: process.env.SATIM_TERMINAL_ID || '',
      udf1: process.env.SATIM_UDF1 || '',
      udf5: process.env.SATIM_UDF5 || '',
    },
  };

  constructor(private readonly prisma: PrismaService) {
    if (!process.env.SATIM_USERNAME || !process.env.SATIM_PASSWORD) {
      throw new Error('SATIM credentials not configured');
    }
    if (!process.env.SATIM_REGISTER_URL || !process.env.SATIM_CONFIRM_URL) {
      throw new Error('SATIM URLs not configured');
    }
  }

  private generateOrderNumber(): string {
    return Date.now().toString().slice(-10);
  }

  async registerPayment(dto: RegisterPaymentDto) {
    try {
      const appointment = await this.prisma.appointment.findUnique({
        where: { id: dto.appointmentId },
        include: { doctor: true }
      });

      if (!appointment) {
        throw new BadRequestException('Appointment not found');
      }

      const orderNumber = this.generateOrderNumber();
      const amountInCentimes = Math.round(dto.amount * 100);
      const language = dto.language || 'fr';
      const returnUrl = `${this.satimConfig.returnUrl}?appointmentId=${dto.appointmentId}&language=${language}`;
      const failUrl = `${this.satimConfig.failUrl}?appointmentId=${dto.appointmentId}&language=${language}`;

      const params = {
        currency: this.satimConfig.currency,
        amount: amountInCentimes,
        language: language.toUpperCase(),
        orderNumber: orderNumber,
        userName: this.satimConfig.userName,
        password: this.satimConfig.password,
        returnUrl: returnUrl,
        failUrl: failUrl,
        jsonParams: JSON.stringify(this.satimConfig.jsonParams),
      };

      console.log('🔵 Registering payment with SATIM...');
      console.log('Order Number:', orderNumber);
      console.log('Amount:', amountInCentimes, 'centimes');

      const response = await axios.get(this.satimConfig.registerUrl, { params });

      console.log('✅ SATIM Response:', response.data);

      if (response.data.errorCode != 0) {
        throw new BadRequestException('Payment registration failed');
      }

      await this.prisma.appointment.update({
        where: { id: dto.appointmentId },
        data: { status: 'PAYMENT_PENDING' },
      });

      return {
        success: true,
        orderId: response.data.orderId,
        formUrl: response.data.formUrl,
        orderNumber: orderNumber,
      };
    } catch (error) {
      console.error('❌ Payment registration error:', error.message);
      throw error;
    }
  }

async confirmPayment(orderId: string, appointmentId: string, language: string) {
  try {
    console.log('🔵 Confirming payment...', orderId);

    const params = {
      language: language.toUpperCase(),
      orderId: orderId,
      password: this.satimConfig.password,
      userName: this.satimConfig.userName,
    };

    // Retry logic for ECONNRESET errors
    let response = null;
    let lastError = null;
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt} to confirm payment...`);
        response = await axios.get(this.satimConfig.confirmUrl, { 
          params, 
          timeout: 30000 
        });
        break; // Success, exit loop
      } catch (err) {
        lastError = err;
        console.log(`⚠️ Attempt ${attempt} failed: ${err.message}`);
        if (attempt < 3) {
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        }
      }
    }
    
    if (!response) {
      throw lastError;
    }

    console.log('✅ SATIM Confirmation Response:', JSON.stringify(response.data, null, 2));

    // Extract values from response
    const respCode = response.data.params?.respCode || response.data.respCode || '';
    const errorCode = response.data.ErrorCode || response.data.errorCode || '';
    const orderStatus = response.data.OrderStatus || response.data.orderStatus || '';
    
    // SUCCESS: respCode === '00' AND (ErrorCode === '0' OR empty) AND OrderStatus === '2'
    const isSuccess = respCode === '00' && 
                     (errorCode === '0' || errorCode === '') && 
                     (orderStatus === '2' || orderStatus === 2);

    console.log('📊 Payment evaluation:', { respCode, errorCode, orderStatus, isSuccess });

    await this.prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: isSuccess ? 'ACCEPTED' : 'REFUSED' },
    });

    return {
      success: isSuccess,
      respCode: respCode,
      respCodeDesc: response.data.params?.respCode_desc || response.data.actionCodeDescription || '',
      errorCode: errorCode,
      orderStatus: orderStatus,
      orderId: orderId,
      orderNumber: response.data.OrderNumber || response.data.orderNumber || '',
      amount: response.data.Amount ? (response.data.Amount / 100).toFixed(2) : 
              response.data.amount ? (response.data.amount / 100).toFixed(2) : '0',
      approvalCode: response.data.approvalCode || response.data.ApprovalCode || '',
      actionCodeDescription: response.data.actionCodeDescription || '',
      pan: response.data.Pan || response.data.pan || '',
      date: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Payment confirmation error:', error.message);
    throw error;
  }
}

  async handleFailedPayment(orderId: string, appointmentId: string, language: string) {
    try {
      const params = {
        language: language.toUpperCase(),
        orderId: orderId,
        password: this.satimConfig.password,
        userName: this.satimConfig.userName,
      };

      const response = await axios.get(this.satimConfig.confirmUrl, { params });

      await this.prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: 'REFUSED' },
      });

      return {
        success: false,
        respCode: response.data.params?.respCode || 'FAILED',
        respCodeDesc: response.data.params?.respCode_desc || 'Paiement échoué',
        actionCodeDescription: response.data.actionCodeDescription || '',
      };
    } catch (error) {
      console.error('❌ Failed payment handling error:', error.message);
      return {
        success: false,
        respCode: 'ERROR',
        respCodeDesc: 'Erreur lors du traitement du paiement',
      };
    }
  }
}
