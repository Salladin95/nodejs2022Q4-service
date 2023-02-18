import { NotFoundException } from '@nestjs/common';
import { Album } from 'src/album/contracts';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import DBService from '../db.service';
import createAlbum from './createAlbum';

const albumsDB = (dbService: DBService) => {
  let albums: Album[] = [];

  const getOne = (id: string) => {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  };

  return {
    getAlbums: () => albums,
    getOne,
    createAlbum: (createAlbumDto: CreateAlbumDto) => {
      if (createAlbumDto.artistId) {
        dbService.artists.getOne(createAlbumDto.artistId);
      }
      const newAlbum = createAlbum(createAlbumDto);
      albums.push(newAlbum);
      return newAlbum;
    },
    updateAlbum: (id: string, updateAlbumDto: UpdateAlbumDto) => {
      getOne(id);
      if (updateAlbumDto.artistId) {
        dbService.artists.getOne(updateAlbumDto.artistId);
      }
      albums = albums.map((album) => {
        if (album.id === id) {
          return {
            ...album,
            ...updateAlbumDto,
          };
        }
        return album;
      });
      return getOne(id);
    },
    deleteAlbum: (id: string) => {
      const album = getOne(id);

      const tracks = dbService.tracks.getTracks();
      tracks.forEach((track) => {
        if (track.albumId === id) {
          dbService.tracks.updateTrack(track.id, { albumId: null });
        }
      });

      if (dbService.favs.getFavsIDS().albums.includes(id)) {
        dbService.favs.deleteFavItem(id, 'albums');
      }

      albums = albums.filter((album) => album.id !== id);
      return album;
    },
    clearTracks: () => {
      albums = [];
    },
  };
};

type AlbumsDB = ReturnType<typeof albumsDB>;

export { albumsDB, AlbumsDB };
