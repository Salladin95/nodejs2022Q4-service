import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService, PrismaService],
  imports: [ConfigModule, AuthModule],
})
export class FavsModule {}
