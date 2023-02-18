import { ApiProperty } from '@nestjs/swagger';

class Artist {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  grammy: boolean;
}

export { Artist };
