import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshByHandAuthGuard extends AuthGuard('jwt-refreshByHand') {}
