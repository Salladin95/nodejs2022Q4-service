import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: 'Login is too short',
  })
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: 'Login is too short',
  })
  newPassword: string;
}
