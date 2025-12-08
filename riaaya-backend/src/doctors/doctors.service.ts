import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/create-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) { }

//create doctors 
 async create(doctor: DoctorDto) {
    return await this.prisma.doctor.create(
      {
        data:doctor
      }
    )
  }


  //Find all doctors list
 async findAll() {
    return await this.prisma.doctor.findMany()
  }

  //find one By Email
 async findOne(email: string) {
    return await this.prisma.doctor.findUnique({
      where:{
        email:email
      }}
    )
  }

  //update doctors information
  async update(id: string, updateDoctorDto: DoctorDto) {
    return await this.prisma.doctor.update({
      where:{
        id:id
      },
      
        data:DoctorDto
      
    })
  }
//Remove Doctor need to add on cascade 
 async remove(id: string) {
    return await this.prisma.doctor.delete({
      where:{
        id:id
      }
    })
}
}