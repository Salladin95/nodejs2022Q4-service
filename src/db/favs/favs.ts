import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import DBService from '../db.service';

export type FavsOption = 'artists' | 'tracks' | 'albums';
type FavsStore = Record<FavsOption, string[]>;

const favsDB = (dbService: DBService) => {
  const favs: FavsStore = { artists: [], albums: [], tracks: [] };

  const getFavItemID = (id: string, key: FavsOption) => {
    const favItemID = favs[key].find((item) => item === id);
    if (!favItemID) {
      throw new NotFoundException();
    }
    return favItemID;
  };

  return {
    getFavsIDS: () => favs,
    getFavs: () => ({
      artists: [],
      albums: [],
      tracks: [],
    }),
    getFavItemID,
    addFavItem: (id: string, key: FavsOption) => {
      try {
        const item = dbService[key].getOne(id);
        !favs[key].includes(id) && favs[key].push(id);
        return item;
      } catch {
        throw new UnprocessableEntityException();
      }
    },
    deleteFavItem: (id: string, key: FavsOption) => {
      const favItemID = getFavItemID(id, key);
      favs[key] = favs[key].filter((item) => item !== id);
      return dbService[key].getOne(favItemID);
    },
  };
};

type FavsDB = ReturnType<typeof favsDB>;

export { favsDB, FavsDB };
