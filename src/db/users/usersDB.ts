import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/contracts';

import { CreateUserDto, UpdateUserDto } from '../../users/dto';

import createUser from './createUser';

const usersDB = () => {
  let users: User[] = [];

  const getUser = (id: string) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  };

  return {
    getUsers: () => users,
    getUser,
    createUser: async (createUserDto: CreateUserDto) => {
      const newUser = createUser(createUserDto);
      users.push(newUser);

      return newUser;
    },
    updateUser: async (id: string, updateUserDto: UpdateUserDto) => {
      getUser(id);
      users = users.map((user) => {
        if (user.id === id) {
          if (user.password !== updateUserDto.oldPassword) {
            throw new ForbiddenException();
          }
          return {
            ...user,
            password: updateUserDto.newPassword,
            updatedAt: Date.now(),
            version: ++user.version,
          };
        }
        return user;
      });
      return getUser(id);
    },
    deleteUser: async (id: string) => {
      const user = getUser(id);
      users = users.filter((user) => user.id !== id);
      return user;
    },
    clearUsers: async () => {
      users = [];
    },
  };
};

type UsersDB = ReturnType<typeof usersDB>;

export { usersDB, UsersDB };
