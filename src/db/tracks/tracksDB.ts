import { NotFoundException } from '@nestjs/common';
import { Track } from 'src/track/contracts';
import { CreateTrackDto, UpdateTrackDto } from 'src/track/dto';
import DBService from '../db.service';
import createTrack from './createTrack';

const tracksDB = (dbService: DBService) => {
  let tracks: Track[] = [];

  const getTrack = (id: string) => {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  };

  return {
    getTracks: () => tracks,
    getTrack,
    createTrack: async (createTrackDto: CreateTrackDto) => {
      if (createTrackDto.artistId) {
        dbService.artistsDB.getArtist(createTrackDto.artistId);
      }
      const newTrack = createTrack(createTrackDto);
      tracks.push(newTrack);
      return newTrack;
    },
    updateTrack: async (id: string, updateTrackDto: UpdateTrackDto) => {
      getTrack(id);
      if (updateTrackDto.artistId) {
        dbService.artistsDB.getArtist(updateTrackDto.artistId);
      }
      tracks = tracks.map((track) => {
        if (track.id === id) {
          return {
            ...track,
            ...updateTrackDto,
          };
        }
        return track;
      });
      return getTrack(id);
    },
    deleteTrack: async (id: string) => {
      const track = getTrack(id);
      tracks = tracks.filter((track) => track.id !== id);
      return track;
    },
    clearTracks: async () => {
      tracks = [];
    },
  };
};

type TracksDB = ReturnType<typeof tracksDB>;

export { tracksDB, TracksDB };
