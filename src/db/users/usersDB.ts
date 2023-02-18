import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/contracts';

import { CreateUserDto, UpdateUserDto } from '../../users/dto';

import createUser from './createUser';

const usersDB = () => {
  let users: User[] = [];

  const getOne = (id: string) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  };

  return {
    getUsers: () => users,
    getOne,
    createUser: (createUserDto: CreateUserDto) => {
      const newUser = createUser(createUserDto);
      users.push(newUser);

      return newUser;
    },
    updateUser: (id: string, updateUserDto: UpdateUserDto) => {
      getOne(id);
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
      return getOne(id);
    },
    deleteUser: (id: string) => {
      const user = getOne(id);
      users = users.filter((user) => user.id !== id);
      return user;
    },
    clearUsers: () => {
      users = [];
    },
  };
};

type UsersDB = ReturnType<typeof usersDB>;

export { usersDB, UsersDB };
