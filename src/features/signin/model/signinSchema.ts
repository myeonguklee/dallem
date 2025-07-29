import z from 'zod';

export const signinSchema = z.object({
  email: z.string().email('errors.validation.email'),
  password: z.string().min(8, 'errors.validation.password'),
});
