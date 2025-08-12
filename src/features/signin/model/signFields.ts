import { AuthFormField } from '@/widgets/AuthForm/model/types';
import { SigninFormData } from './type';

export const signFields = [
  { name: 'email', label: 'pages.signin.email', placeholder: 'pages.signup.emailPlaceholder' },
  {
    name: 'password',
    label: 'pages.signin.password',
    placeholder: 'pages.signup.passwordPlaceholder',
    type: 'password',
  },
] as const satisfies AuthFormField<SigninFormData>[];
