import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ example: 1 })
  version: number;
  @ApiProperty({ example: 1231415 })
  createdAt: number;
  @ApiProperty({ example: 11111 })
  updatedAt: number;
}

export { User };
