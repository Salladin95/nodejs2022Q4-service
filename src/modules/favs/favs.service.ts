import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type FavsEntityOption = 'artist' | 'album' | 'track';
// type FavsOption = 'favoriteAlbum' | 'favoriteArtist' | 'favoriteTrack';

const getDataObj = {
  album: (id: string) => ({ data: { albumId: id } }),
  artist: (id: string) => ({ data: { artistId: id } }),
  track: (id: string) => ({ data: { trackId: id } }),
};

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: string, key: FavsEntityOption) {
    if (key === 'artist') {
      const item = await this.prisma.artist.findUnique({ where: { id } });
      if (!item) {
        throw new UnprocessableEntityException();
      }
      await this.prisma.favoriteArtist.create(getDataObj[key](id));
      return item;
    } else if (key === 'album') {
      const item = await this.prisma.album.findUnique({ where: { id } });
      if (!item) {
        throw new UnprocessableEntityException();
      }
      await this.prisma.favoriteAlbum.create(getDataObj[key](id));
      return item;
    } else {
      const item = await this.prisma.track.findUnique({ where: { id } });
      if (!item) {
        throw new UnprocessableEntityException();
      }
      await this.prisma.favoriteTrack.create(getDataObj[key](id));
      return item;
    }
  }

  async findAll() {
    const albumsIDS = await this.prisma.favoriteAlbum.findMany();
    const albums = albumsIDS
      ? await Promise.all(
          albumsIDS.map((album) =>
            this.prisma.album.findUnique({ where: { id: album.albumId } }),
          ),
        )
      : [];

    const artistsIDS = await this.prisma.favoriteArtist.findMany();
    const artists = artistsIDS
      ? await Promise.all(
          artistsIDS.map((artist) =>
            this.prisma.artist.findUnique({ where: { id: artist.artistId } }),
          ),
        )
      : [];

    const tracksIDS = (await this.prisma.favoriteTrack.findMany()) ?? [];
    const tracks = tracksIDS
      ? await Promise.all(
          tracksIDS.map((track) =>
            this.prisma.track.findUnique({ where: { id: track.trackId } }),
          ),
        )
      : [];
    return { albums, artists, tracks };
  }

  async remove(id: string, key: FavsEntityOption) {
    if (key === 'artist') {
      const artist = await this.prisma.favoriteArtist.findFirst({
        where: { artistId: id },
      });
      if (!artist) {
        throw new NotFoundException();
      }
      await this.prisma.favoriteArtist.delete({ where: { artistId: id } });
    } else if (key === 'album') {
      const album = await this.prisma.favoriteAlbum.findFirst({
        where: { albumId: id },
      });
      if (!album) {
        throw new NotFoundException();
      }
      await this.prisma.favoriteAlbum.delete({ where: { albumId: id } });
    } else if (key === 'track') {
      const track = await this.prisma.favoriteTrack.findFirst({
        where: { trackId: id },
      });
      if (!track) {
        throw new NotFoundException();
      }
      await this.prisma.favoriteTrack.delete({ where: { trackId: id } });
    }
  }
}
