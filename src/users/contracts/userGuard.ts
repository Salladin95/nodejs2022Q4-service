import { isArrayOf } from 'src/utils';
import { User, UserSchema } from '.';

const isUser = (user: unknown): user is User => {
  return UserSchema.safeParse(user).success;
};

const isUsers = (data: unknown): data is User[] =>
  isArrayOf<User>(isUser)(data);

export { isUser, isUsers };
