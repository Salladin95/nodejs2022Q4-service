import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  newPassword: string;
}
