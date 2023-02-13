import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AlbumEntity } from '../../modules/album/entities/album.entity';
import { ArtistEntity } from '../../modules/artist/entities/artist.entity';
import { Track } from '../../modules/track/contracts';
import { FavsResponse } from './contracts';
import { FavsService } from './favs.service';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) { }

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
    return this.favsService.create(id, 'tracks');
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
    return this.favsService.remove(id, 'tracks');
  }

  @Post('album/:id')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: AlbumEntity,
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
    return this.favsService.create(id, 'albums');
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
    return this.favsService.remove(id, 'albums');
  }

  @Post('artist/:id')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: ArtistEntity,
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
    return this.favsService.create(id, 'artists');
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
    return this.favsService.remove(id, 'artists');
  }
}
