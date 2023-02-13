import { Injectable } from '@nestjs/common';

import { favsDB, FavsDB } from './favs/favs';
import { tracksDB, TracksDB } from './tracks/tracksDB';

@Injectable()
class DBService {
  tracks: TracksDB;
  favs: FavsDB;
  constructor() {
    this.tracks = tracksDB(this);
    this.favs = favsDB(this);
  }
}

export default DBService;
