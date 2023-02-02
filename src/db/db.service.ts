import { Injectable } from '@nestjs/common';

import usersDB, { UsersDB } from './users/usersDB';

@Injectable()
class DBService {
  usersDB: UsersDB;
  constructor() {
    this.usersDB = usersDB();
  }
}

export default DBService;
