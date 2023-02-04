import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  artistId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  albumId: string;

  @ApiProperty({ example: 22222 })
  @IsNumber()
  duration: number;
}
