import z from 'zod';

export const signinSchema = z.object({
  email: z.string().trim().email('errors.validation.email'),
  password: z.string().trim().min(8, 'errors.validation.password'),
});
