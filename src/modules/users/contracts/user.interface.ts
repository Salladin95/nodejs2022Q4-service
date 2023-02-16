import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

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

  @ApiProperty({ example: 1231245 })
  @Transform(({ value }) => +new Date(value))
  createdAt: Date;

  @ApiProperty({ example: 1112313 })
  @Transform(({ value }) => +new Date(value))
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export { User };
