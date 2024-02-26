import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(20)
});

const loginWithEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20)
});

const loginWithUsernameSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20)
});

const loginSchema = loginWithEmailSchema.or(loginWithUsernameSchema);

export {
  signUpSchema,
  loginSchema
}
