// import { AuthFormField } from '@/widgets/AuthForm/model/types';

// import { LoginFormData } from './type';

export const loginFields = [
  { name: 'email', label: 'pages.signup.email', placeholder: 'pages.signup.emailPlaceholder' },
  {
    name: 'password',
    label: 'pages.signup.password',
    placeholder: 'pages.signup.passwordPlaceholder',
    type: 'password',
    withVariant: 'password_default',
  },
];
// as const satisfies AuthFormField<LoginFormData>[];
