import { z } from 'zod';
import { UserSchema } from 'src/users/contracts';

const UsersJsonDBSchema = z.object({
  users: z.array(UserSchema),
});

type UsersJsonDB = z.infer<typeof UsersJsonDBSchema>;

export { UsersJsonDB, UsersJsonDBSchema };
