import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>

        {/* 한국어 */}
        <div className="mb-8">
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">페이지를 찾을 수 없습니다</h2>
          <p className="mt-2 text-gray-500">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <div className="mt-6">
            <Link
              href="/ko"
              className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-8 border-t border-gray-300"></div>

        {/* 영어 */}
        <div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="mt-2 text-gray-500">
            The page you requested does not exist or has been moved.
          </p>
          <div className="mt-6">
            <Link
              href="/en"
              className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
