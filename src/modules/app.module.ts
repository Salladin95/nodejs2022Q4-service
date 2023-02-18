import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { manualConfig } from '../configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [manualConfig],
    }),
    UsersModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
  ],
})
export class AppModule {}
