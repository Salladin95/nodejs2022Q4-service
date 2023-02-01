import { Injectable } from '@nestjs/common';

import usersDB, { UsersDB } from './users/usersDB';

@Injectable()
class DB {
  usersDB: UsersDB;
  constructor() {
    this.usersDB = usersDB();
  }
}

export default DB;
