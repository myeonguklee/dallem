# Gathering API 사용법

## 📁 파일 구조

```
src/entities/gathering/api/
├── index.ts      # 모든 API 함수와 훅을 export
├── services.ts   # HTTP 요청 함수들(axios)
├── queries.ts    # React Query 훅들
├── queryKeys.ts  # 쿼리 키 관리
└── README.md     # 이 파일
```

## 🚀 빠른 시작

```tsx
import { useGetGatherings } from '@/entities/gathering/api';

export default function GatheringListPage() {
  // 모임 목록 조회
  const { data: gatherings, isLoading, error } = useGetGatherings();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <div>
      {gatherings?.map((gathering) => (
        <div key={gathering.id}>{gathering.name}</div>
      ))}
    </div>
  );
}
```
