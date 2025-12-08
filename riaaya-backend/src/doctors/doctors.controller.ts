import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDto } from './dto/create-doctor.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) { }

  @UseGuards(JwtStrategy)
  @Post()
  create(@Body() createDoctorDto: DoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @UseGuards(JwtStrategy)
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @UseGuards(JwtStrategy)
  @Get(':id')
  findOne(@Param('id') Email: string) {
    return this.doctorsService.findOne(Email);
  }

  @UseGuards(JwtStrategy)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: DoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @UseGuards(JwtStrategy)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}
