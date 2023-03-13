import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  invalidTokenMsg,
  passwordsDontMatchMsg,
  userNotExist,
} from 'src/utils';
import { checkPassword } from 'src/utils/bcrypt';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './contracts';
import { CreateAuthDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  async signup(userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  async login({ login, password }: CreateUserDto) {
    const user = await this.usersService.findOneByLogin(login);

    if (!user) {
      throw new ForbiddenException(userNotExist);
    }

    const passwordMatch = await checkPassword(password, user.password);

    if (!passwordMatch) {
      throw new ForbiddenException(passwordsDontMatchMsg);
    }
    const tokens = await this.getTokens({ userId: user.id, login: user.login });
    return tokens;
  }

  async refresh({ refreshToken }: CreateAuthDto) {
    try {
      const { login, userId } = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.config.get('jwt.refreshTokenSecret'),
          ignoreExpiration: false,
        },
      );
      const tokens = await this.getTokens({ userId, login });
      return tokens;
    } catch {
      throw new ForbiddenException(invalidTokenMsg);
    }
  }

  async getTokens(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('jwt.accessTokenSecret'),
      expiresIn: this.config.get('jwt.accessTokenExpiresIn'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('jwt.refreshTokenSecret'),
      expiresIn: this.config.get('jwt.refreshTokenExpiresIn'),
    });
    return { accessToken, refreshToken };
  }
}
