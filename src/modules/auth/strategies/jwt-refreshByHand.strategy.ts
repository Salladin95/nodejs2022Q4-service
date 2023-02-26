import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtRefreshByHandStrategy implements CanActivate {
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
      .then((isTokenValid) => {
        if (!isTokenValid) {
          console.log('token is not valid');
          throw new ForbiddenException('Token is not valid');
        } else {
          console.log('token is valid', isTokenValid);
          return true;
        }
      });
  }
}
