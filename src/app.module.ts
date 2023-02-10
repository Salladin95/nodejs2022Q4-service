import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { ConfigEnum, ormconfig, manualConfig } from './configs';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ormconfig, manualConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<DataSourceOptions>(ConfigEnum.ORMCONFIG),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
  ],
})
export class AppModule { }
