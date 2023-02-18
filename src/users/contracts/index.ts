import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiProperty({ example: 1231415 })
  createdAt: number;

  @ApiProperty({ example: 11111 })
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export { User };
