import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {

  @IsOptional()
  @MinLength(10)
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role: string;

}
