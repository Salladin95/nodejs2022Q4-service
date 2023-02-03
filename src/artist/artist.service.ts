import { Injectable } from '@nestjs/common';
import DBService from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DBService) { }
  create(createArtistDto: CreateArtistDto) {
    return this.db.artistsDB.createArtist(createArtistDto);
  }

  findAll() {
    return this.db.artistsDB.getArtists();
  }

  findOne(id: string) {
    return this.db.artistsDB.getArtist(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.db.artistsDB.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    return this.db.artistsDB.deleteArtist(id);
  }
}
