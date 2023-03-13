import * as bcrypt from 'bcrypt';

const encodePassword = async (password: string, salt: number) => {
  return bcrypt.hash(password, salt);
};

const checkPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export { encodePassword, checkPassword };
