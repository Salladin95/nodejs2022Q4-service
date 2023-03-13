import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AlbumService } from './album.service';
import { Album } from './contracts/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('album')
@Controller('album')
@UsePipes(ValidationPipe)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({
    status: 201,
    type: Album,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [Album],
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({
    status: 200,
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
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
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
