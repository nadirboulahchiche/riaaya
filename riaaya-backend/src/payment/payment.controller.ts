import { Controller, Post, Get, Body, Query, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { RegisterPaymentDto } from './dto/register-payment.dto';
import { Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Register payment
  @Post('register')
  async registerPayment(@Body() dto: RegisterPaymentDto) {
    return this.paymentService.registerPayment(dto);
  }

  // Payment success callback
  @Get('callback')
  async paymentCallback(
    @Query('orderId') orderId: string,
    @Query('appointmentId') appointmentId: string,
    @Query('language') language: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.paymentService.confirmPayment(
        orderId,
        appointmentId,
        language || 'fr',
      );

      // Build result URL with all parameters
      const frontendUrl = process.env.FRONTEND_URL;
      const resultUrl =
        `${frontendUrl}/payment-result?` +
        `success=${result.success}` +
        `&respCode=${encodeURIComponent(result.respCode)}` +
        `&respCodeDesc=${encodeURIComponent(result.respCodeDesc)}` +
        `&orderId=${encodeURIComponent(result.orderId)}` +
        `&orderNumber=${encodeURIComponent(result.orderNumber)}` +
        `&amount=${encodeURIComponent(result.amount)}` +
        `&approvalCode=${encodeURIComponent(result.approvalCode)}` +
        `&pan=${encodeURIComponent(result.pan)}` +
        `&date=${encodeURIComponent(result.date)}` +
        `&language=${encodeURIComponent(language || 'fr')}`;

      res.redirect(resultUrl);
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL;
      res.redirect(`${frontendUrl}/payment-result?error=${encodeURIComponent(error.message)}`);
    }
  }

  // Payment failed callback
  @Get('failed')
  async paymentFailed(
    @Query('orderId') orderId: string,
    @Query('appointmentId') appointmentId: string,
    @Query('language') language: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.paymentService.handleFailedPayment(
        orderId,
        appointmentId,
        language || 'fr',
      );

      const frontendUrl = process.env.FRONTEND_URL;
      const resultUrl =
        `${frontendUrl}/payment-result?` +
        `success=false` +
        `&respCode=${encodeURIComponent(result.respCode)}` +
        `&respCodeDesc=${encodeURIComponent(result.respCodeDesc)}` +
        `&language=${encodeURIComponent(language || 'fr')}`;

      res.redirect(resultUrl);
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL;
      res.redirect(`${frontendUrl}/payment-result?error=${encodeURIComponent(error.message)}`);
    }
  }
}
