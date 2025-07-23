import z from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(1, 'errors.validation.required'),
    email: z.string().email('errors.validation.email'),
    company: z.string().min(1, 'errors.validation.required'),
    password: z.string().min(8, 'errors.validation.password'),
    confirmPassword: z.string().min(1, 'errors.validation.passwordConfirm'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'errors.validation.passwordConfirm',
    path: ['confirmPassword'],
  });
