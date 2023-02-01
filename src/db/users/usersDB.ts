import { resolve } from 'path';

import {
  notFoundMsg,
  passwordsDontMatchMsg,
  safeJsonParse,
  userAlreadyExistMsg,
  loadJson,
  writeJson,
} from 'src/utils';

import { CreateUserDto, UpdateUserDto } from '../../users/dto';
import { UsersJsonDB } from './contracts';

import createUser from './createUser';
import isUsersDB from './dbTypeGuards';

const usersDB = () => {
  const usersJsonPath = resolve(__dirname, 'db-users.json');
  let db: UsersJsonDB = { users: [] };

  loadJson(usersJsonPath)
    .then((unparsedUsersDB) => {
      db = <UsersJsonDB>safeJsonParse(isUsersDB)(unparsedUsersDB);
    })
    .catch(() => {
      (async () => {
        await writeJson(usersJsonPath, JSON.stringify(db));
      })();
    });

  const getUser = (id: string) => {
    const user = db.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(notFoundMsg);
    }
    return user;
  };

  return {
    getUsers: () => db,
    getUser,
    createUser: async (createUserDto: CreateUserDto) => {
      if (db.users.find((user) => user.login === createUserDto.login)) {
        throw new Error(userAlreadyExistMsg);
      }
      const newUser = createUser(createUserDto);
      db.users.push(newUser);
      await writeJson(usersJsonPath, JSON.stringify(db));
      return newUser;
    },
    updateUser: async (id: string, updateUserDto: UpdateUserDto) => {
      if (!getUser(id)) {
        throw new Error(notFoundMsg);
      }
      db.users = db.users.map((user) => {
        if (user.id === id) {
          if (user.password !== updateUserDto.oldPassword) {
            throw new Error(passwordsDontMatchMsg);
          }
          return { ...user, password: updateUserDto.newPassword };
        }
        return user;
      });
      await writeJson(usersJsonPath, JSON.stringify(db));
      return getUser(id);
    },
    deleteUser: async (id: string) => {
      const user = getUser(id);
      if (!user) {
        throw new Error(notFoundMsg);
      }
      db.users = db.users.filter((user) => user.id !== id);
      await writeJson(usersJsonPath, JSON.stringify(db));
      return user;
    },
    cleaerUsers: async () => {
      db.users = [];
      await writeJson(usersJsonPath, JSON.stringify(db));
    },
  };
};

export type UsersDB = ReturnType<typeof usersDB>;

export default usersDB;
