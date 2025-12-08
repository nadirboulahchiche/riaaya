import { IsEmail, IsEnum, IsString} from 'class-validator';

export enum UserRole {
  Admin = 'Admin',
  Doctors = 'Manager',
}

export class RegisterDto {
  @IsString()
  name:string

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}


