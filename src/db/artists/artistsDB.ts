import { NotFoundException } from '@nestjs/common';

import { Artist } from 'src/artist/contracts';
import { CreateArtistDto } from 'src/artist/dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import DBService from '../db.service';
import createArtist from './createArtist';

const artistsDB = (dbService: DBService) => {
  let artists: Artist[] = [];

  const getOne = (id: string) => {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  };

  return {
    getArtists: () => artists,
    getOne,
    createArtist: (createArtistDto: CreateArtistDto) => {
      const newArtist = createArtist(createArtistDto);
      artists.push(newArtist);
      return newArtist;
    },
    updateArtist: (id: string, updateArtistDto: UpdateArtistDto) => {
      getOne(id);
      artists = artists.map((artist) => {
        if (artist.id === id) {
          return {
            ...artist,
            ...updateArtistDto,
          };
        }
        return artist;
      });
      return getOne(id);
    },
    deleteArtist: (id: string) => {
      const artist = getOne(id);

      if (dbService.favs.getFavsIDS().artists.includes(id)) {
        dbService.favs.deleteFavItem(id, 'artists');
      }

      const tracks = dbService.tracks.getTracks();
      tracks.forEach((track) => {
        if (track.artistId === id) {
          dbService.tracks.updateTrack(track.id, { artistId: null });
        }
      });

      const albums = dbService.albums.getAlbums();
      albums.forEach((album) => {
        if (album.artistId === id) {
          dbService.albums.updateAlbum(album.id, { artistId: null });
        }
      });

      artists = artists.filter((artist) => artist.id !== id);
      return artist;
    },
    clearArtists: () => {
      artists = [];
    },
  };
};

type ArtistsDB = ReturnType<typeof artistsDB>;

export { artistsDB, ArtistsDB };
