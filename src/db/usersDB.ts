import { resolve } from 'path';

import { User } from 'src/users/contracts';
import { usersGurard } from 'src/users/contracts/userGuard';
import {
  notFoundMsg,
  passwordsDontMatchMsg,
  safeJsonParse,
  userAlreadyExistMsg,
} from 'src/utils';
import { CreateUserDto, UpdateUserDto } from '../users/dto';

import createUser from './createUser';
import loadJson from './loadJson';
import writeJson from './writeJson';

const usersDB = () => {
  const usersJsonPath = resolve(__dirname, 'db-users.json');
  let users: User[] = [];
  loadJson(usersJsonPath).then((unparsedUsers) => {
    users = <User[]>safeJsonParse(usersGurard)(unparsedUsers);
  });

  const getUser = (id: string) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error(notFoundMsg);
    }
    return user;
  };

  return {
    getUsers: () => users,
    getUser,
    createUser: async (createUserDto: CreateUserDto) => {
      if (users.find((user) => user.login === createUserDto.login)) {
        throw new Error(userAlreadyExistMsg);
      }
      const newUser = createUser(createUserDto);
      users.push(newUser);
      await writeJson(usersJsonPath, JSON.stringify(users));
      return newUser;
    },
    updateUser: async (id: string, updateUserDto: UpdateUserDto) => {
      if (!getUser(id)) {
        throw new Error();
      }
      users = users.map((user) => {
        if (user.id === id) {
          if (user.password !== updateUserDto.oldPassword) {
            throw new Error(passwordsDontMatchMsg);
          }
          return { ...user, password: updateUserDto.newPassword };
        }
        return user;
      });
      await writeJson(usersJsonPath, JSON.stringify(users));
      return getUser(id);
    },
    deleteUser: async (id: string) => {
      const user = getUser(id);
      if (!user) {
        throw new Error(notFoundMsg);
      }
      users = users.filter((user) => user.id !== id);
      await writeJson(usersJsonPath, JSON.stringify(users));
      return user;
    },
    cleaerUsers: async () => {
      users = [];
      await writeJson(usersJsonPath, JSON.stringify(users));
    },
  };
};

export type UsersDB = ReturnType<typeof usersDB>;

export default usersDB;
