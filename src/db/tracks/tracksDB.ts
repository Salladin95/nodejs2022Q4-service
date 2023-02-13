import { NotFoundException } from '@nestjs/common';
import { Track } from '../../modules/track/contracts';
import { CreateTrackDto, UpdateTrackDto } from '../../modules/track/dto';
import DBService from '../db.service';
import createTrack from './createTrack';

const tracksDB = (dbService: DBService) => {
  let tracks: Track[] = [];

  const getOne = (id: string) => {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  };

  return {
    getTracks: () => tracks,
    getOne,
    createTrack: (createTrackDto: CreateTrackDto) => {
      const newTrack = createTrack(createTrackDto);
      tracks.push(newTrack);
      return newTrack;
    },
    updateTrack: (id: string, updateTrackDto: UpdateTrackDto) => {
      getOne(id);
      tracks = tracks.map((track) => {
        if (track.id === id) {
          return {
            ...track,
            ...updateTrackDto,
          };
        }
        return track;
      });
      return getOne(id);
    },
    deleteTrack: (id: string) => {
      const track = getOne(id);

      if (dbService.favs.getFavsIDS().tracks.includes(id)) {
        dbService.favs.deleteFavItem(id, 'tracks');
      }

      tracks = tracks.filter((track) => track.id !== id);
      return track;
    },
    clearTracks: () => {
      tracks = [];
    },
  };
};

type TracksDB = ReturnType<typeof tracksDB>;

export { tracksDB, TracksDB };
