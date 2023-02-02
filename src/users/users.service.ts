import { Injectable } from '@nestjs/common';

import DBService from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DBService) {}
  create(createUserDto: CreateUserDto) {
    return this.db.usersDB.createUser(createUserDto);
  }

  findAll() {
    return this.db.usersDB.getUsers();
  }

  findOne(id: string) {
    return this.db.usersDB.getUser(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.db.usersDB.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.db.usersDB.deleteUser(id);
  }
}
