import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import omitKeyFromObj from 'src/utils/omitKeyFromObj';

import { User } from './contracts';

export interface Response<T> {
  data: T | T[];
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Response<T>> {
  intercept(_, next: CallHandler): Observable<Response<User>> {
    return next.handle().pipe(
      map((data) => {
        if (isArray(data)) {
          return data.map((user) => omitKeyFromObj('password', user));
        }
        return omitKeyFromObj('password', data);
      }),
    );
  }
}
