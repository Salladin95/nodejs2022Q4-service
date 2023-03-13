import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.TrackUncheckedCreateInput) {
    return this.prisma.track.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async update(id: string, data: Prisma.TrackUncheckedUpdateInput) {
    const track = await this.findOne(id);
    if (!track) {
      throw new NotFoundException();
    }

    await this.prisma.track.update({
      where: {
        id,
      },
      data,
    });
    return { ...track, ...data };
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    if (!track) {
      throw new NotFoundException();
    }
    const result = await this.prisma.track.delete({ where: { id } });
    return result;
  }
}
