import { PrismaService } from 'src/prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './contracts/user.interface';
import { CreateUserDto } from './dto';
import { checkPassword, encodePassword } from 'src/utils/bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  async create({ login, password }: CreateUserDto) {
    const salt = this.config.get('jwt.salt');
    const hash = await encodePassword(password, salt);
    const user = await this.prisma.user.create({
      data: { login, password: hash },
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

  async findOneByLogin(login: string) {
    const user = await this.prisma.user.findUnique({ where: { login } });
    return user ? this.transform(user) : null;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    const passwordMatch = await checkPassword(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!passwordMatch) {
      throw new ForbiddenException('Passwords don"t match');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        version: user.version + 1,
        password: updateUserDto.newPassword,
      },
    });
    return this.transform(updatedUser);
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
