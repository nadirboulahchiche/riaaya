import { IsEmail, IsNotEmpty, IsOptional, IsString, } from 'class-validator';

export class DoctorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  specialty: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  imagePath: string;


}
