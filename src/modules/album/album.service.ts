import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) { }
  async create(data: Prisma.AlbumUncheckedCreateInput) {
    return this.prisma.album.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async update(id: string, data: Prisma.AlbumUncheckedUpdateInput) {
    const album = await this.findOne(id);
    if (!album) {
      throw new NotFoundException();
    }

    await this.prisma.album.update({
      where: {
        id,
      },
      data,
    });
    return { ...album, data };
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    if (!album) {
      throw new NotFoundException();
    }
    const result = await this.prisma.album.delete({ where: { id } });
    return result;
  }
}
