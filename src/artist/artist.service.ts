import { Injectable } from '@nestjs/common';
import DBService from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DBService) {}
  create(createArtistDto: CreateArtistDto) {
    return this.db.artists.createArtist(createArtistDto);
  }

  findAll() {
    return this.db.artists.getArtists();
  }

  findOne(id: string) {
    return this.db.artists.getOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.db.artists.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    return this.db.artists.deleteArtist(id);
  }
}
