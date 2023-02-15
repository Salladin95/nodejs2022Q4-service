import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  async create(createArtistDto: CreateArtistDto) {
    // const artist = this.artistRepository.create(createArtistDto);
    // await this.artistRepository.save(artist);
    // return artist;
  }

  async findAll() {
    // const artist = await this.artistRepository.find();
    // return artist;
  }

  async findOne(id: string) {
    // const artist = await this.artistRepository.findOne({ where: { id } });
    // if (!artist) {
    //   throw new NotFoundException();
    // }
    // return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    // await this.findOne(id);
    // const updatedArtist = await this.artistRepository.update(
    //   id,
    //   updateArtistDto,
    // );
    // return updatedArtist;
  }

  async remove(id: string) {
    //   const result = await this.artistRepository.delete(id);
    //   if (result.affected === 0) {
    //     throw new NotFoundException();
    //   }
    //   return result;
  }
}
