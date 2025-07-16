import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes';
import HeaderLink from './HeaderLink';
import Logo from './Logo';
import { MobileGNB } from './MobileGNB';

const Header = () => {
  return (
    <header className="tablet:h-15 px-mobile-padding tablet:px-tablet-padding relative flex h-14 justify-center gap-5 border-b border-gray-200 bg-white">
      <div className="web:max-w-web flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <MobileGNB />
          <Logo className="tablet:h-15 tablet:relative tablet:left-0 tablet:-translate-x-0 absolute top-0 left-1/2 h-14 -translate-x-1/2 content-center justify-self-center" />

          <nav className="tablet:flex hidden gap-6">
            <HeaderLink href={ROUTES.GATHERINGS}>모임 찾기</HeaderLink>
            <HeaderLink href={ROUTES.HEART}>찜한 모임</HeaderLink>
            <HeaderLink href={ROUTES.REVIEW}>모든 리뷰</HeaderLink>
          </nav>
        </div>
        <Link
          href={ROUTES.SIGNIN}
          className="bg-primary w-[3.875rem] rounded-[5px] px-2.5 py-1 font-semibold text-white hover:bg-orange-600"
        >
          로그인
        </Link>
      </div>
    </header>
  );
};

export default Header;
