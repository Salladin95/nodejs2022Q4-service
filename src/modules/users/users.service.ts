import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateUserDto) {
    // return this.prisma.user.create({
    // data,
    // });
  }

  async findAll() {
    // const users = await this.userRepository.find();
    // return users;
  }

  async findOne(id: string) {
    //   const user = await this.userRepository.findOne({ where: { id } });
    //   if (!user) {
    //     throw new NotFoundException();
    //   }
    //   return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // const user = await this.userRepository.findOne({ where: { id } });
    // if (!user) {
    //   throw new NotFoundException();
    // }
    // if (user.password !== updateUserDto.oldPassword) {
    //   throw new ForbiddenException('Passwords don"t match');
    // }
    //
    // const updatedUser = { ...user, password: updateUserDto.newPassword };
    // await this.userRepository.update(id, updatedUser);
    // return updatedUser;
  }

  async remove(id: string) {
    // const result = await this.userRepository.delete(id);
    // if (result.affected === 0) {
    //   throw new NotFoundException();
    // }
    // return result;
  }

  async findByLogin(login: string) {
    // const user = await this.userRepository.findOne({ where: { login } });
    // return user ? user : null;
  }

  async isLoginExist(login: string) {
    //   const user = await this.findByLogin(login);
    //   if (user) {
    //     throw new BadRequestException(`User with login: ${login} already exists`);
    //   }
  }
}
