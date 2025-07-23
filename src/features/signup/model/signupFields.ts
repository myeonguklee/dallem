import { AuthFormField } from '@/widgets/AuthForm/model/types';
import { SignupFormData } from './type';

export const signupFields = [
  { name: 'name', label: 'pages.signup.name', placeholder: 'pages.signup.namePlaceholder' },
  { name: 'email', label: 'pages.signup.email', placeholder: 'pages.signup.emailPlaceholder' },
  {
    name: 'company',
    label: 'pages.signup.company',
    placeholder: 'pages.signup.companyPlaceholder',
  },
  {
    name: 'password',
    label: 'pages.signup.password',
    placeholder: 'pages.signup.passwordPlaceholder',
    type: 'password',
    withVariant: 'password_default',
  },
  {
    name: 'confirmPassword',
    label: 'pages.signup.confirmPassword',
    placeholder: 'pages.signup.confirmPasswordPlaceholder',
    type: 'password',
    withVariant: 'password_default',
  },
] as const satisfies AuthFormField<SignupFormData>[];
