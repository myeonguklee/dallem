'use client';

// 디자인 시스템에 맞게 추후 변경
export function GlobalErrorFallback({ reset }: { error: Error; reset: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>앗, 예상치 못한 오류가 발생했어요!</h2>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      >
        다시 시도하기
      </button>
    </div>
  );
}
