import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtAccessStrategy, JwtRefreshStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule,
    PassportModule,
    JwtModule,
  ],
  exports: [AuthService, JwtAccessStrategy, JwtAccessStrategy, JwtModule],
})
export class AuthModule {}
