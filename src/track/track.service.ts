import { Injectable } from '@nestjs/common';
import DBService from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly db: DBService) { }
  create(createTrackDto: CreateTrackDto) {
    return this.db.tracksDB.createTrack(createTrackDto);
  }

  findAll() {
    return this.db.tracksDB.getTracks();
  }

  findOne(id: string) {
    return this.db.tracksDB.getTrack(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.db.tracksDB.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return this.db.tracksDB.deleteTrack(id);
  }
}
