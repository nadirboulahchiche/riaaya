import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  //create users
 async create(createUserDto: UserDto) {
    return await this.prisma.user.create({
      data:createUserDto
    })
  }

  //find all doctor
  async findAll() {
    return await this.prisma.user.findMany({
      where:{
        role:'doctor'
      }}
    );
  }

  //find User by Id 
  async findOne(id: string) {
    return await this.prisma.user.findFirst({
      where:{
        id:id
      }
    })
  }


  //update User
  async update(id: string, updateUserDto: UserDto) {
    return await this.prisma.user.update({
      where:{
        id:id
      },
      data:updateUserDto
      
    })
  }

  //find by email
  async findByEmail(email:string){
    return await this.prisma.user.findUnique({
      where:{
        email:email
      }
    })
  }


  //delete by id
  remove(id: string) {
    return this.prisma.user.delete(
      {
        where:{
          id:id
        }
      }
    )
  }

  removebyEmail(Email:string){
        return this.prisma.user.delete(
      {
        where:{
          email:Email
        }
      }
    )

  }

}
