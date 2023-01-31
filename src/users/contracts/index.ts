import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  login: z.string(),
  password: z.string(),
  version: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

type User = z.infer<typeof UserSchema>;

export { UserSchema, User };
