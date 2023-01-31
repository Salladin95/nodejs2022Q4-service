import { isUUID } from 'class-validator';

import { isArrayOf } from 'src/utils';
import { User, UserSchema } from '.';

const userGuard = (user: unknown): user is User => {
  const parse = UserSchema.safeParse(user);
  const summary = parse.success && isUUID(parse.data.id);
  return summary;
};

const usersGurard = (data: unknown): data is User[] =>
  isArrayOf<User>(userGuard)(data);

export { userGuard, usersGurard };
