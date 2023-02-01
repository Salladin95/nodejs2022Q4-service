import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  login: z.string().min(3),
  password: z.string().min(4),
  version: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

type User = Required<z.infer<typeof UserSchema>>;

export { UserSchema, User };
