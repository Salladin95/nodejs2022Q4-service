import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService, PrismaService],
  imports: [ConfigModule, AuthModule],
})
export class TrackModule {}
