import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { FavsEntityOption, FavsOption } from './contracts';
import { getDataObj, getFavsKey } from './utils';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(id: string, key: string) {
    const favsKey = getFavsKey[key]();
    const item = await this.prisma[key].findUnique({
      where: { id },
    });
    if (!item) {
      throw new UnprocessableEntityException();
    }
    await this.prisma[favsKey].create(getDataObj(id));
    return item;
  }

  async findAll() {
    const albums = await this.getOriginalItems('favoriteAlbum', 'album');
    const artists = await this.getOriginalItems('favoriteArtist', 'artist');
    const tracks = await this.getOriginalItems('favoriteTrack', 'track');

    return { albums, artists, tracks };
  }

  async remove(id: string, key: string) {
    const favsKey = getFavsKey[key]();
    const item = await this.prisma[favsKey].findFirst({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException();
    }
    await this.prisma[favsKey].delete({ where: { id } });
  }

  async getOriginalItems(favsKey: FavsOption, itemTableKey: FavsEntityOption) {
    const listOfId = await this.getListOfFavsByKey(favsKey);
    const items = await this.getItemsFromIDS(itemTableKey, listOfId);
    return items;
  }

  async getListOfFavsByKey(favsKey: string) {
    const listOfId = await this.prisma[favsKey].findMany();
    return listOfId;
  }

  async getItemsFromIDS(itemTableKey: string, items: { id: string }[]) {
    const result = await Promise.all(
      items.map((item) =>
        this.prisma[itemTableKey].findUnique({ where: { id: item.id } }),
      ),
    );
    return result;
  }
}
