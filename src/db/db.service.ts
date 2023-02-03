import { Injectable } from '@nestjs/common';

import { artistsDB, ArtistsDB } from './artists/artistsDB';
import { tracksDB, TracksDB } from './tracks/tracksDB';
import { usersDB, UsersDB } from './users/usersDB';

@Injectable()
class DBService {
  usersDB: UsersDB;
  artistsDB: ArtistsDB;
  tracksDB: TracksDB;
  constructor() {
    this.usersDB = usersDB();
    this.artistsDB = artistsDB(this);
    this.tracksDB = tracksDB(this);
  }
}

export default DBService;
