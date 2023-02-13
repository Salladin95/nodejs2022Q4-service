import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from '../../album/entities/album.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { Track } from '../../track/contracts';

interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

class FavsResponse {
  @ApiProperty({
    example: [
      {
        id: 'f983ef86-906e-43f1-a788-7b90722dd60',
        name: 'Name',
        grammy: true,
      },
    ],
  })
  artists: ArtistEntity[];

  @ApiProperty({
    example: [
      {
        id: 'f983ef86-906e-43f1-a788-7b90722dd63',
        name: 'Name',
        year: 1888,
        artistId: 'f983ef86-906e-43f1-a788-7b90722dd60',
      },
    ],
  })
  albums: AlbumEntity[];

  @ApiProperty({
    example: [
      {
        id: 'f983ef86-906e-43f1-a788-7b90722dd64',
        name: 'Name',
        duration: 111,
        artistId: 'f983ef86-906e-43f1-a788-7b90722dd60',
        albumId: 'f983ef86-906e-43f1-a788-7b90722dd63',
      },
    ],
  })
  tracks: Track[];
}

export { Favorites, FavsResponse };
