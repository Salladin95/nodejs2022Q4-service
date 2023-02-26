import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/refresh.dto';
import { JwtRefreshByHandGuard } from './guards/jwt-refreshByHand.guard';

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

  @UseGuards(JwtRefreshByHandGuard)
  @Post('refresh')
  @UsePipes(ValidationPipe)
  async refresh(@Body() refreshDto: CreateAuthDto) {
    return this.authService.refresh(refreshDto);
  }
}
