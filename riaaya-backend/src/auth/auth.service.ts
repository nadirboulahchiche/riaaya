import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  //Register Dto
  async register(registerDto: RegisterDto) {

    const {name, email, password, role } = registerDto;

    
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User already exists'); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role
      },
    });

    return {
      id: user.id,
      email: user.email,
    };
  }

  //show if user is true user
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


//Login 
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role.name };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      accessToken,
      refreshToken,
      user:user
    };
  }



  async refreshToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (user?.refreshToken !== refreshToken) {
      throw new NotFoundException('Invalid refresh token');
    }

    return this.login(user); 
  }

  async revokeRefreshToken(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
  
async Stat(){
    const doctors = await this.prisma.user.count({
      where:{
        role:"doctor"
      }
    })

    const acceptedAppointmenet = await this.prisma.appointment.count({
      where:{
        status:"Accepted"
      }
    })

    const allAppointmenet = await this.prisma.appointment.count()

    return {
      "doctor": doctors,
      "AcceptedAppointmenets":acceptedAppointmenet,
      "allAppointmenet":allAppointmenet
    }



}

}
