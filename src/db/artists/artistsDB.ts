import { NotFoundException } from '@nestjs/common';

import { Artist } from 'src/artist/contracts';
import { CreateArtistDto } from 'src/artist/dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import DBService from '../db.service';
import createArtist from './createArtist';

const artistsDB = (dbService: DBService) => {
  let artists: Artist[] = [];

  const getArtist = (id: string) => {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  };

  return {
    getArtists: () => artists,
    getArtist,
    createArtist: async (createArtistDto: CreateArtistDto) => {
      const newArtist = createArtist(createArtistDto);
      artists.push(newArtist);
      return newArtist;
    },
    updateArtist: async (id: string, updateArtistDto: UpdateArtistDto) => {
      getArtist(id);
      artists = artists.map((artist) => {
        if (artist.id === id) {
          return {
            ...artist,
            ...updateArtistDto,
          };
        }
        return artist;
      });
      return getArtist(id);
    },
    deleteArtist: async (id: string) => {
      const artist = getArtist(id);

      const tracks = dbService.tracksDB.getTracks();
      tracks.forEach((track) => {
        if (track.artistId === id) {
          dbService.tracksDB.updateTrack(track.id, { artistId: null });
        }
      });

      const albums = dbService.albumsDB.getAlbums();
      albums.forEach((album) => {
        if (album.artistId === id) {
          dbService.tracksDB.updateTrack(album.id, { artistId: null });
        }
      });

      artists = artists.filter((artist) => artist.id !== id);
      return artist;
    },
    clearArtists: async () => {
      artists = [];
    },
  };
};

type ArtistsDB = ReturnType<typeof artistsDB>;

export { artistsDB, ArtistsDB };
