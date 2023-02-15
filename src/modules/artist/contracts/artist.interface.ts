import { ApiProperty } from '@nestjs/swagger';

class ArtistEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  grammy: boolean;
}

export { ArtistEntity };
