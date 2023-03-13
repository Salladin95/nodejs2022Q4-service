import { Module } from '@nestjs/common';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
  imports: [ConfigModule, AuthModule],
})
export class ArtistModule {}
