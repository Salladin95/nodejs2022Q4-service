import { UsersDB } from './usersDB';

const initializeDB = (usersDB: UsersDB) => {
  const db = { usersDB };
  db.usersDB.getUsers();
  return db;
};

export default initializeDB;
