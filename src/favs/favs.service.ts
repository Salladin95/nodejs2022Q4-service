import { Injectable } from '@nestjs/common';
import DBService from 'src/db/db.service';
import { FavsOption } from 'src/db/favs/favs';

@Injectable()
export class FavsService {
  constructor(private readonly db: DBService) {}
  create(id: string, key: FavsOption) {
    return this.db.favs.addFavItem(id, key);
  }

  findAll() {
    return this.db.favs.getFavs();
  }

  remove(id: string, key: FavsOption) {
    return this.db.favs.deleteFavItem(id, key);
  }
}
