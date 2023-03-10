import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Album } from '../../modules/album/contracts/album.interface';
import { Artist } from '../../modules/artist/contracts/artist.interface';
import { Track } from '../../modules/track/contracts/track.interface';
import { JwtAccessAuthGuard } from '../auth/guards';
import { FavsResponse } from './contracts';
import { FavsService } from './favs.service';

@ApiTags('favs')
@UseGuards(JwtAccessAuthGuard)
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: FavsResponse,
  })
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity',
  })
  createFavTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.create(id, 'track');
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  removeFavTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.remove(id, 'track');
  }

  @Post('album/:id')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity',
  })
  createFavAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.create(id, 'album');
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  removeFavAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.remove(id, 'album');
  }

  @Post('artist/:id')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity',
  })
  createFavArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.create(id, 'artist');
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  removeFavArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.remove(id, 'artist');
  }
}
