import { Injectable } from '@nestjs/common';
import { albumsDB, AlbumsDB } from './albums/albumsDB';

import { artistsDB, ArtistsDB } from './artists/artistsDB';
import { favsDB, FavsDB } from './favs/favs';
import { tracksDB, TracksDB } from './tracks/tracksDB';

@Injectable()
class DBService {
  artists: ArtistsDB;
  tracks: TracksDB;
  albums: AlbumsDB;
  favs: FavsDB;
  constructor() {
    this.artists = artistsDB(this);
    this.tracks = tracksDB(this);
    this.albums = albumsDB(this);
    this.favs = favsDB(this);
  }
}

export default DBService;
