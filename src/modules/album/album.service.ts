import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepostitory: Repository<AlbumEntity>,
  ) { }

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepostitory.create(createAlbumDto);
    await this.albumRepostitory.save(album);
    return album;
  }

  async findAll() {
    const albums = await this.albumRepostitory.find({
      relations: { artist: true },
    });
    return albums;
  }

  async findOne(id: string) {
    const album = await this.albumRepostitory.findOne({
      where: { id },
      relations: { artist: true },
    });
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const one = await this.findOne(id);
    this.albumRepostitory.update(id, updateAlbumDto);
    return { ...one, ...updateAlbumDto };
  }

  async remove(id: string) {
    const result = await this.albumRepostitory.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
