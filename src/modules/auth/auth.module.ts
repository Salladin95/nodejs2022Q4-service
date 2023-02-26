import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtRefreshByHandStrategy } from './strategies/jwt-refreshByHand.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshStrategy, JwtRefreshByHandStrategy],
  imports: [UsersModule, ConfigModule, PassportModule, JwtModule.register({})],
})
export class AuthModule {}
