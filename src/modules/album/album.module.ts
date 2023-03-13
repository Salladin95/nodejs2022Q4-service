import { Module } from '@nestjs/common';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService],
  imports: [ConfigModule, AuthModule],
})
export class AlbumModule {}
