import { User } from 'src/users/contracts';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { v4 } from 'uuid';

const createUser = ({ login, password }: CreateUserDto): User => ({
  id: v4(),
  login,
  password,
  version: 1,
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
});

export default createUser;
