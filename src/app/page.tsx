import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

export default async function RootPage() {
  redirect(`/${defaultLocale}`);
}
