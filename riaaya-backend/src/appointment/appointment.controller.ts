import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get(':doctorid')
  Stat(@Param('doctorid') doctorid: string) {
    return this.appointmentService.Stat(doctorid);
  }
  


  @UseGuards(JwtStrategy)
  @Get(':status')
  findAll(@Param('status') id: string) {
    return this.appointmentService.findAll(id);
  }

  @Get('status/:EmailDoctor')
  findAllstatus(@Param('EmailDoctor') EmailDoctor: string) {
    return this.appointmentService.findAll(EmailDoctor);
  }



  @UseGuards(JwtStrategy)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @UseGuards(JwtStrategy)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @UseGuards(JwtStrategy)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
