import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import DBModule from 'src/db/db.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DBModule],
})
export class UsersModule {}
