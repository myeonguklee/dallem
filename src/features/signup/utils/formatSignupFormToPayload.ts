import { SignupPayload } from '@/entities/auth/model/types';
import { SignupFormData } from '@/features/signup/model/type';

export const formatSignupFormToPayload = ({
  email,
  password,
  name,
  company,
}: SignupFormData): SignupPayload => ({
  email,
  password,
  name,
  companyName: company,
});
