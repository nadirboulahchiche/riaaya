import { IsUUID, IsDateString, IsOptional, IsString, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {

  @IsUUID()
  doctorId: string;

  @IsString()
  date: string; // Use string, will be parsed as ISO 8601

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber

  @IsNotEmpty()
  @IsString()
  clientName: string

  @IsNotEmpty()
  @IsString()
  time:string
}
