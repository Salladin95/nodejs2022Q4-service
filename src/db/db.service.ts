import { Injectable } from '@nestjs/common';
import { albumsDB, AlbumsDB } from './albums/albumsDB';

import { artistsDB, ArtistsDB } from './artists/artistsDB';
import { tracksDB, TracksDB } from './tracks/tracksDB';
import { usersDB, UsersDB } from './users/usersDB';

@Injectable()
class DBService {
  usersDB: UsersDB;
  artistsDB: ArtistsDB;
  tracksDB: TracksDB;
  albumsDB: AlbumsDB;
  constructor() {
    this.usersDB = usersDB();
    this.artistsDB = artistsDB(this);
    this.tracksDB = tracksDB(this);
    this.albumsDB = albumsDB(this);
  }
}

export default DBService;
