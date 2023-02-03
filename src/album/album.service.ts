import { Injectable } from '@nestjs/common';
import DBService from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DBService) {}
  create(createAlbumDto: CreateAlbumDto) {
    return this.db.albums.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.db.albums.getAlbums();
  }

  findOne(id: string) {
    return this.db.albums.getOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.db.albums.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.db.albums.deleteAlbum(id);
  }
}
