import { v4 } from 'uuid';

import { Album } from 'src/album/contracts';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';

const createAlbum = ({ name, artistId, year }: CreateAlbumDto): Album => ({
  id: v4(),
  name,
  artistId: artistId ?? null,
  year,
});

export default createAlbum;
