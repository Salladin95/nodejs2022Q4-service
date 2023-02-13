import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
})
export class ArtistModule { }
