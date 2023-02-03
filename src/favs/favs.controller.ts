import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  createFavTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.create(id, 'tracks');
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeFavTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.remove(id, 'tracks');
  }

  @Post('album/:id')
  @HttpCode(201)
  createFavAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.create(id, 'albums');
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeFavAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.remove(id, 'albums');
  }

  @Post('artist/:id')
  @HttpCode(201)
  createFavArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.create(id, 'artists');
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeFavArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.remove(id, 'artists');
  }
}
