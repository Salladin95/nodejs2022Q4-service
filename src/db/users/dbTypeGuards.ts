import { UsersJsonDB, UsersJsonDBSchema } from './contracts';

const isUsersDB = (target: unknown): target is UsersJsonDB => {
  return UsersJsonDBSchema.safeParse(target).success;
};

export default isUsersDB;
