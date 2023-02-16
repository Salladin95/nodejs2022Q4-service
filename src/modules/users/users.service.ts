import { PrismaService } from 'src/prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { User as UserEntity } from './contracts/user.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  async create(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({
      data,
    });
    return this.transform(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(this.transform);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return this.transform(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Passwords don"t match');
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: { password: updateUserDto.newPassword },
    });
    return this.transform({ ...user, password: updateUserDto.newPassword });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    const result = await this.prisma.user.delete({ where: { id } });
    return result;
  }

  transform(user: User) {
    return new UserEntity(user);
  }
}
