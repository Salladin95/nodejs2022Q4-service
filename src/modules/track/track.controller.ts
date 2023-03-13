import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './contracts/track.interface';
import { JwtAccessAuthGuard } from '../auth/guards';

@ApiTags('track')
@UseGuards(JwtAccessAuthGuard)
@Controller('track')
@UsePipes(ValidationPipe)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: 201,
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @HttpCode(201)
  create(@Body(ValidationPipe) createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [Track],
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Track,
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
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({
    status: 200,
    type: Track,
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
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
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
    return this.trackService.remove(id);
  }
}
