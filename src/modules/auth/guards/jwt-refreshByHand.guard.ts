import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { invalidTokenMsg } from 'src/utils';

@Injectable()
export class JwtRefreshByHandGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return this.jwtService
      .verifyAsync(refreshToken, {
        secret: this.config.get('jwt.refreshTokenSecret'),
        ignoreExpiration: false,
      })
      .then(({ userId, login }) => {
        req['user'] = { userId, login };
        return true;
      })
      .catch(() => {
        throw new ForbiddenException(invalidTokenMsg);
      });
  }
}
