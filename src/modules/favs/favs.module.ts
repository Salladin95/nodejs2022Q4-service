import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import DBModule from 'src/db/db.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [DBModule],
})
export class FavsModule {}
