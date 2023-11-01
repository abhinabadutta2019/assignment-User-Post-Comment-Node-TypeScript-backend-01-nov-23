import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
});

export type IUser = z.infer<typeof UserSchema>;
