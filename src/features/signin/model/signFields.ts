import { AuthFormField } from '@/widgets/AuthForm/model/types';
import { SigninFormData } from './type';

export const signFields = [
  { name: 'email', label: 'pages.signin.email', placeholder: 'pages.signin.emailPlaceholder' },
  {
    name: 'password',
    label: 'pages.signin.password',
    placeholder: 'pages.signin.passwordPlaceholder',
    type: 'password',
  },
] as const satisfies AuthFormField<SigninFormData>[];
