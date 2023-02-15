import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import omitKeyFromObj from 'src/utils/omitKeyFromObj';

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

  @ApiProperty({ example: '2023-02-11T09:19:58.437Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-02-11T09:19:58.437Z' })
  updatedAt: Date;

  toResponse() {
    const response = omitKeyFromObj<User>('password', this);
    return response;
  }
}

export { User };
