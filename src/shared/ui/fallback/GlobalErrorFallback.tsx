'use client';

// 디자인 시스템에 맞게 추후 변경
export function GlobalErrorFallback({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          앗, 예상치 못한 오류가 발생했어요!
        </h2>
        <p className="mb-6 text-gray-600">페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
        <button
          onClick={() => reset()}
          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
}
