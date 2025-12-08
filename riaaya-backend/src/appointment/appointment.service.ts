import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) { }

  //create Appointment
  async create(createAppointmentDto: CreateAppointmentDto) {
    return await this.prisma.appointment.create({
      data: createAppointmentDto
    })
  }
  //find all Appointments based on status
  async findAll(doctorEmail: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        email: doctorEmail
      }
    })

    const PendingAppointments = await this.prisma.appointment.findMany({
      where: {
        AND: [
          {
            doctorId: doctor?.id
          },
          { status: 'PENDING' }
        ]
      }
    })

    const allAcceptedAppointmenet = await this.prisma.appointment.findMany({
      where: {
        AND: [
          {
            doctorId: doctor?.id
          },
          { status: 'ACCEPTED' }
        ]
      }
    })




    return {
      "Accepted": allAcceptedAppointmenet,
      "Pending": PendingAppointments,
    }
  }

  //find apointmenet
  async findOne(id: string) {
    return await this.prisma.appointment.findUnique({
      where: {
        id: id
      }
    })
  }
  //Update Apointemenet
  async update(id: string, updateAppointmentDto: CreateAppointmentDto) {
    return await this.prisma.appointment.update({
      where: {
        id: id
      },
      data: updateAppointmentDto
    })
  }
  //Remove Apointemenet
  async remove(id: string) {
    return await this.prisma.appointment.delete({
      where: {
        id: id
      }
    })
  }

  //Get Stat 
  async Stat(doctoremail: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        email: doctoremail
      }
    })
    const allApointmenet = await this.prisma.appointment.count({
      where: {
        doctorId: doctor?.id
      }
    })

    const allAcceptedAppointmenet = await this.prisma.appointment.count({
      where: {
        AND: [
          {
            doctorId: doctor?.id
          },
          { status: 'ACCEPTED' }
        ]
      }
    })

    const allRefusedAppointmenet = await this.prisma.appointment.count({
      where: {
        AND: [
          {
            doctorId: doctor?.id
          },
          { status: 'REFUSED' }
        ]
      }
    })


    return {
      total: allApointmenet,
      accepted: allAcceptedAppointmenet,
      refused: allRefusedAppointmenet
    };


  }
}
