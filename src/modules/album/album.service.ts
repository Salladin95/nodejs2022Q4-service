import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateAlbumDto) {
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

  async update(id: string, data: UpdateAlbumDto) {
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
    return { ...album, ...data };
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
