import type { Pathnames } from '@/i18n';
import { INPUT_VARIANT } from '@/shared/ui/input/Input';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

export type AuthFormField<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: string;
  withVariant?: keyof typeof INPUT_VARIANT;
};

export type AuthFormMeta = {
  title: string;
  buttonLabel: string;
  footerText: string;
  footerLinkText: string;
  footerHref: Exclude<Pathnames, '/gathering/[id]'>;
};

export type AuthFormHandlers<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export type AuthFormProps<T extends FieldValues> = {
  meta: AuthFormMeta;
  fields: AuthFormField<T>[];
  handlers: AuthFormHandlers<T>;
  isValid: boolean;
};
