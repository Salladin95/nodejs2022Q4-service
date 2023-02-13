import { Injectable } from '@nestjs/common';
import DBService from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly db: DBService) {}
  create(createTrackDto: CreateTrackDto) {
    return this.db.tracks.createTrack(createTrackDto);
  }

  findAll() {
    return this.db.tracks.getTracks();
  }

  findOne(id: string) {
    return this.db.tracks.getOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.db.tracks.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return this.db.tracks.deleteTrack(id);
  }
}
