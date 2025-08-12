import z from 'zod';

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, 'errors.validation.required'),
    email: z.string().trim().email('errors.validation.email'),
    company: z.string().trim().min(1, 'errors.validation.required'),
    password: z.string().trim().min(8, 'errors.validation.password'),
    confirmPassword: z.string().trim().min(1, 'errors.validation.passwordConfirm'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'errors.validation.passwordConfirm',
    path: ['confirmPassword'],
  });
