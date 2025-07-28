import { signinSchema } from '@/features/signin/model/signinSchema';
import z from 'zod';

export type SigninFormData = z.infer<typeof signinSchema>;
