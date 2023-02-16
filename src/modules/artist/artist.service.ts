import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateArtistDto) {
    return this.prisma.artist.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const atist = await this.prisma.artist.findUnique({ where: { id } });
    if (!atist) {
      throw new NotFoundException();
    }
    return atist;
  }

  async update(id: string, data: UpdateArtistDto) {
    const atist = await this.findOne(id);
    if (!atist) {
      throw new NotFoundException();
    }

    await this.prisma.artist.update({
      where: {
        id,
      },
      data,
    });
    return { ...atist, ...data };
  }

  async remove(id: string) {
    const atist = await this.findOne(id);
    if (!atist) {
      throw new NotFoundException();
    }
    const result = await this.prisma.artist.delete({ where: { id } });
    return result;
  }
}
