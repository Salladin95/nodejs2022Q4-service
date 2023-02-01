import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { APP_PIPE } from '@nestjs/core';

import DB from 'src/db/db';
import { ValidationPipe } from './validate.pipe';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    DB,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class UsersModule {}
