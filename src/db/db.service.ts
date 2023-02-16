import { Injectable } from '@nestjs/common';

import { favsDB, FavsDB } from './favs/favs';

@Injectable()
class DBService {
  favs: FavsDB;
  constructor() {
    this.favs = favsDB(this);
  }
}

export default DBService;
