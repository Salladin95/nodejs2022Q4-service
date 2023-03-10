import { ApiProperty } from '@nestjs/swagger';

import { Album } from '../../album/contracts/album.interface';
import { Artist } from '../../artist/contracts/artist.interface';
import { Track } from '../../track/contracts/track.interface';

export interface FavoritesEntity {
  artists: string[];
  albums: string[];
  tracks: string[];
}
export type FavsEntityOption = 'artist' | 'album' | 'track';
export type FavsOption = 'favoriteAlbum' | 'favoriteArtist' | 'favoriteTrack';

export enum FavsEntityEnum {
  artist = 'artist',
  album = 'album',
  track = 'track',
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
  artists: Artist[];

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
  albums: Album[];

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

export { FavsResponse };
