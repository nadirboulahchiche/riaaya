import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import { RegisterPaymentDto } from './dto/register-payment.dto';

@Injectable()
export class PaymentService {
  private readonly satimConfig = {
    baseUrl: process.env.SATIM_BASE_URL,
    registerUrl: process.env.SATIM_REGISTER_URL,
    confirmUrl: process.env.SATIM_CONFIRM_URL,
    userName: process.env.SATIM_USERNAME,
    password: process.env.SATIM_PASSWORD,
    currency: '012', // DZD
    returnUrl: process.env.PAYMENT_RETURN_URL,
    failUrl: process.env.PAYMENT_FAIL_URL,
    jsonParams: {
      force_terminal_id: process.env.SATIM_TERMINAL_ID,
      udf1: process.env.SATIM_UDF1,
      udf5: process.env.SATIM_UDF5,
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  // Generate 10-digit order number
  private generateOrderNumber(): string {
    return Date.now().toString().slice(-10);
  }

  // Register payment with SATIM
  async registerPayment(dto: RegisterPaymentDto) {
    try {
      // Validate appointment exists
      const appointment = await this.prisma.appointment.findUnique({
        where: { id: dto.appointmentId },
        include: { doctor: true }
      });

      if (!appointment) {
        throw new BadRequestException('Appointment not found');
      }

      // Generate order number
      const orderNumber = this.generateOrderNumber();

      // Convert to centimes
      const amountInCentimes = Math.round(dto.amount * 100);

      // Build return URLs with language
      const language = dto.language || 'fr';
      const returnUrl = `${this.satimConfig.returnUrl}?appointmentId=${dto.appointmentId}&language=${language}`;
      const failUrl = `${this.satimConfig.failUrl}?appointmentId=${dto.appointmentId}&language=${language}`;

      // SATIM register.do params
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

      // Call SATIM API
      const response = await axios.get(this.satimConfig.registerUrl, { params });

      console.log('✅ SATIM Response:', response.data);

      if (response.data.errorCode != 0) {
        throw new BadRequestException('Payment registration failed');
      }

      // Store payment info in appointment
      await this.prisma.appointment.update({
        where: { id: dto.appointmentId },
        data: {
          status: 'PAYMENT_PENDING',
          // You might want to add payment fields to Appointment model
        },
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

  // Confirm payment and update appointment
  async confirmPayment(orderId: string, appointmentId: string, language: string) {
    try {
      console.log('🔵 Confirming payment...', orderId);

      // Call SATIM acknowledgeTransaction.do
      const params = {
        language: language.toUpperCase(),
        orderId: orderId,
        password: this.satimConfig.password,
        userName: this.satimConfig.userName,
      };

      const response = await axios.get(this.satimConfig.confirmUrl, { params });

      console.log('✅ SATIM Confirmation:', response.data);

      const respCode = response.data.params?.respCode || '';
      const errorCode = response.data.ErrorCode || '';
      const orderStatus = response.data.OrderStatus || '';

      // Check if payment is successful
      const isSuccess = respCode === '00' && errorCode === '0' && orderStatus === '2';

      // Update appointment status
      await this.prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          status: isSuccess ? 'ACCEPTED' : 'REFUSED',
        },
      });

      return {
        success: isSuccess,
        respCode: respCode,
        respCodeDesc: response.data.params?.respCode_desc || '',
        errorCode: errorCode,
        orderStatus: orderStatus,
        orderId: orderId,
        orderNumber: response.data.OrderNumber || '',
        amount: response.data.Amount ? (response.data.Amount / 100).toFixed(2) : '0',
        approvalCode: response.data.approvalCode || '',
        actionCodeDescription: response.data.actionCodeDescription || '',
        pan: response.data.Pan || '',
        date: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Payment confirmation error:', error.message);
      throw error;
    }
  }

  // Handle failed payment
  async handleFailedPayment(orderId: string, appointmentId: string, language: string) {
    try {
      // Try to get payment details
      const params = {
        language: language.toUpperCase(),
        orderId: orderId,
        password: this.satimConfig.password,
        userName: this.satimConfig.userName,
      };

      const response = await axios.get(this.satimConfig.confirmUrl, { params });

      // Update appointment to REFUSED
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
