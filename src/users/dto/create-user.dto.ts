import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: 'Login is too short',
  })
  login: string;

  @ApiProperty()
  @IsString()
  @MinLength(5, {
    message: 'Password is too short',
  })
  password: string;
}
