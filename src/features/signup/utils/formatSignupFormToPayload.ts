import { SignupPayload } from '@/entities/auth/model/types';
import { SignupFormData } from '@/features/signup/model/type';

export const formatSignupFormToPayload = (form: SignupFormData): SignupPayload => ({
  email: form.email,
  password: form.password,
  name: form.name,
  companyName: form.company,
});
