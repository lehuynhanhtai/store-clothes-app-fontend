import { z } from 'zod';

export type FormState =
  | {
      error?: {
        firstName?: string[];
        lastName?: string[];
        account?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
export const SignupFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Name must be at least 2 characters long' }).trim(),
  lastName: z.string().min(2, { message: 'Name must be at least 2 characters long' }).trim(),
  account: z.string().min(2, { message: 'Name must be at least 2 characters long' }).trim(),
  password: z
    .string()
    // .min(8, { message: 'Password must be at least 8 characters long' })
    // .regex(/[a-zA-Z]/, { message: 'Contains at least one letter' })
    // .regex(/[0-9]/, { message: 'Contains at least one number' })
    .trim(),
});

export const SignInFormSchema = z.object({
  account: z.string().trim(),
  password: z.string().min(3, { message: 'Password must be at least 8 characters long' }).trim(),
});

export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER',
}
