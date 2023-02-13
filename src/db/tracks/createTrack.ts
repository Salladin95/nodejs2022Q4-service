import { v4 } from 'uuid';

import { Track } from '../../modules/track/contracts';
import { CreateTrackDto } from '../../modules/track/dto';

const createTrack = ({
  name,
  artistId,
  albumId,
  duration,
}: CreateTrackDto): Track => ({
  id: v4(),
  name,
  artistId: artistId ?? null,
  albumId: albumId ?? null,
  duration,
});

export default createTrack;
