import { resolve } from 'path';

import { User } from 'src/users/contracts';
import { usersGurard } from 'src/users/contracts/userGuard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import {
  notFoundMsg,
  passwordsDontMatchMsg,
  safeJsonParse,
  userAlreadyExistMsg,
} from 'src/utils';
import createUser from './createUser';

import loadJson from './loadJson';
import writeJson from './writeJson';

const usersDB = () => {
  const usersJsonPath = resolve(__dirname, 'db-users.json');
  let users: User[] = [];
  loadJson(usersJsonPath).then((unparsedUsers) => {
    users = <User[]>safeJsonParse(usersGurard)(unparsedUsers);
  });

  return {
    getUsers: () => users,
    getUser: (id: string) => {
      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new Error(notFoundMsg);
      }
      return user;
    },
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
      if (!users.find((user) => user.id === id)) {
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
      const user = users.find((user) => user.id === id);
      return user;
    },
    deleteUser: async (id: string) => {
      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new Error(notFoundMsg);
      }
      users = users.filter((user) => user.id !== id);
      await writeJson(usersJsonPath, JSON.stringify(users));
      return user;
    },
  };
};

export type UsersDB = ReturnType<typeof usersDB>;

export default usersDB;
