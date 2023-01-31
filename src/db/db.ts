import { resolve } from 'path';

import { User } from 'src/users/contracts';
import { usersGurard } from 'src/users/contracts/userGuard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { safeJsonParse } from 'src/utils';
import createUser from './createUser';

import loadJson from './loadJson';
import writeJson from './writeJson';

const db = async () => {
  const usersJsonPath = resolve(__dirname, 'db-users.json');
  const unparsedUsers = await loadJson(usersJsonPath);

  let users = <User[]>safeJsonParse(usersGurard)(unparsedUsers);

  return {
    getUsers: () => users,
    getUser: (id: string) => {
      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
    createUser: async (createUserDto: CreateUserDto) => {
      if (users.find((user) => user.login === createUserDto.login)) {
        throw new Error('User already exists');
      }

      const newUser = createUser(createUserDto);
      users.push(newUser);
      await writeJson(usersJsonPath, JSON.stringify(users));
      return newUser;
    },
    updateUser: async (id: string, updateUserDto: UpdateUserDto) => {
      if (!users.find((user) => user.id === id)) {
        throw new Error('User not found');
      }
      users = users.map((user) => {
        if (user.id === id) {
          if (user.password !== updateUserDto.oldPassword) {
            throw new Error('Passwords don"t match');
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
        throw new Error('User not found');
      }
      users = users.filter((user) => user.id !== id);
      await writeJson(usersJsonPath, JSON.stringify(users));
      return user;
    },
  };
};

export default db;
