import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto';

import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/refreshToken.guard';
import { JwtRefreshByHandAuthGuard } from './guards/refreshTokenByHand.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async signup(@Body() userDto: CreateUserDto) {
    return this.authService.signup(userDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @UseGuards(JwtRefreshByHandAuthGuard)
  @Post('refresh')
  @UsePipes(ValidationPipe)
  async refresh(@Request() req) {
    return this.authService.refresh(req.user);
  }
}
