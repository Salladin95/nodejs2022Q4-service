import { NotFoundException } from '@nestjs/common';
import { Album } from 'src/album/contracts';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import DBService from '../db.service';
import createAlbum from './createAlbum';

const albumsDB = (dbService: DBService) => {
  let albums: Album[] = [];

  const getAlbum = (id: string) => {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  };

  return {
    getAlbums: () => albums,
    getAlbum,
    createAlbum: async (createAlbumDto: CreateAlbumDto) => {
      if (createAlbumDto.artistId) {
        dbService.artistsDB.getArtist(createAlbumDto.artistId);
      }
      const newAlbum = createAlbum(createAlbumDto);
      albums.push(newAlbum);
      return newAlbum;
    },
    updateAlbum: async (id: string, updateAlbumDto: UpdateAlbumDto) => {
      getAlbum(id);
      if (updateAlbumDto.artistId) {
        dbService.artistsDB.getArtist(updateAlbumDto.artistId);
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
      return getAlbum(id);
    },
    deleteAlbum: async (id: string) => {
      const album = getAlbum(id);

      const tracks = dbService.tracksDB.getTracks();
      tracks.forEach((track) => {
        if (track.albumId === id) {
          dbService.tracksDB.updateTrack(track.id, { albumId: null });
        }
      });

      albums = albums.filter((album) => album.id !== id);
      return album;
    },
    clearTracks: async () => {
      albums = [];
    },
  };
};

type AlbumsDB = ReturnType<typeof albumsDB>;

export { albumsDB, AlbumsDB };
