import { Injectable } from '@nestjs/common';
import DBService from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DBService) { }
  create(createAlbumDto: CreateAlbumDto) {
    return this.db.albumsDB.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.db.albumsDB.getAlbums();
  }

  findOne(id: string) {
    return this.db.albumsDB.getAlbum(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.db.albumsDB.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.db.albumsDB.deleteAlbum(id);
  }
}
