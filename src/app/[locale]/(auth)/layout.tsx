'use client';

import { AuthPageDecoration } from '@/shared/ui/AuthPageDecoration/AuthPageDecoration';

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-web web:flex-row web:justify-between flex flex-1 flex-col items-center">
      <div className="tablet:mt-10 mt-8 flex flex-col items-center text-center">
        <AuthPageDecoration />
      </div>
      {children}
    </section>
  );
}
