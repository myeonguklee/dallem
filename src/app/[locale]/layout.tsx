import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Locale } from '@/i18n';
import { ReactQueryProvider } from '@/shared/api';
import { ToastProvider } from '@/shared/ui/toast';
import { Header } from '@/widgets/Header/ui/Header';
import { Pretendard } from '../fonts/pretendard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as { title: string; description: string };

  return metadata;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={Pretendard.className}>
        <div className="flex min-h-screen flex-col antialiased">
          <NextIntlClientProvider messages={messages}>
            <ReactQueryProvider>
              <Header />
              <main className="tablet:mt-15 web:max-w-web web:px-0 tablet:px-tablet-padding px-mobile-padding mt-14 flex w-full flex-1 justify-center self-center overflow-auto">
                {children}
              </main>
              <ToastProvider />
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
