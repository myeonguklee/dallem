import { signupSchema } from '@/features/signup/model/signupSchema';
import z from 'zod';

export type SignupFormData = z.infer<typeof signupSchema>;
