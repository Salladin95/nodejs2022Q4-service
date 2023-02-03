import { v4 } from 'uuid';
import { Artist } from 'src/artist/contracts';
import { CreateArtistDto } from 'src/artist/dto';

const createArtist = ({ grammy, name }: CreateArtistDto): Artist => ({
  id: v4(),
  name,
  grammy,
});

export default createArtist;
