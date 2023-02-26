import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { passwordsDontMatchMsg, userNotExist } from 'src/utils';
import { checkPassword } from 'src/utils/bcrypt';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './contracts';

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

  async refresh(payload: JwtPayload) {
    const tokens = await this.getTokens(payload);
    return tokens;
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
