import { ApiProperty } from '@nestjs/swagger';

class Album {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ example: 1888 })
  year: number;

  @ApiProperty({ example: null })
  artistId: string | null;
}

export { Album };
