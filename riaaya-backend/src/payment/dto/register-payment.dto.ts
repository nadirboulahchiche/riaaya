import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';

export class RegisterPaymentDto {
  @IsNumber()
  @Min(1000)
  @Max(5000)
  amount: number;

  @IsString()
  appointmentId: string;

  @IsString()
  @IsOptional()
  language?: string;
}
