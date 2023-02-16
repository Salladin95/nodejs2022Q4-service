import { ApiProperty } from '@nestjs/swagger';

class Track {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  artistId: string | null;

  @ApiProperty()
  albumId: string | null;

  @ApiProperty({ example: 22222 })
  duration: number;
}

export { Track };
