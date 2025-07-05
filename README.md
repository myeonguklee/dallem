# 같이달램 (Dallem)

함께하는 모임으로 건강하고 활기찬 직장생활을 만들어보세요.

## 📋 프로젝트 소개

같이달램은 직장인들을 위한 모임 플랫폼입니다. 동료들과 함께 다양한 모임을 만들고 참여하여 더욱 풍요로운 직장생활을 경험할 수 있습니다.

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**:
  - 서버 상태: TanStack Query (React Query)
  - 클라이언트 상태: Zustand
- **Form**: React Hook Form + Zod
- **UI Components**: Storybook

### Development Tools

- **Linting**: ESLint + Prettier
- **Testing**: Jest + Testing Library
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Commitlint

## 🚀 시작하기

### Prerequisites

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/FESI-10th-team6/dallem.git
cd dallem

# 의존성 설치
npm install
```

### 환경 변수 설정

```bash
# .env.local 파일 생성
cp .env.example .env.local

# 환경 변수 설정
NEXT_PUBLIC_API_URL=https://fe-adv-project-together-dallaem.vercel.app
NEXT_PUBLIC_TEAM_ID=1
```

### 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:3000 확인
```

## 📜 사용 가능한 스크립트

```bash
# 개발
npm run dev          # 개발 서버 시작 (Turbopack)
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 시작

# 코드 품질
npm run lint         # ESLint 검사
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포맷팅
npm run format:check # Prettier 검사
npm run type-check   # TypeScript 타입 검사

# 테스트
npm run test         # 테스트 실행
npm run test:watch   # 테스트 감시 모드
npm run test:coverage # 테스트 커버리지

# Storybook
npm run storybook    # Storybook 개발 서버
npm run build-storybook # Storybook 빌드
```

## 📁 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # 인증 관련 페이지
│   ├── gatherings/     # 모임 관련 페이지
│   ├── profile/        # 프로필 페이지
│   └── layout.tsx      # 루트 레이아웃
├── entities/           # 도메인 엔티티
│   ├── gathering/      # 모임 엔티티
│   ├── review/         # 리뷰 엔티티
│   └── user/           # 사용자 엔티티
├── features/           # 비즈니스 기능
│   ├── auth/           # 인증 기능
│   ├── gathering/      # 모임 기능
│   ├── profile/        # 프로필 기능
│   └── review/         # 리뷰 기능
├── widgets/            # UI 위젯
│   ├── Footer/         # 푸터 위젯
│   ├── GatheringCard/  # 모임 카드 위젯
│   ├── GatheringList/  # 모임 목록 위젯
│   ├── Header/         # 헤더 위젯
│   └── ReviewList/     # 리뷰 목록 위젯
└── shared/             # 공유 리소스
    ├── api/            # API 관련
    ├── config/         # 설정
    ├── lib/            # 유틸리티 라이브러리
    ├── types/          # 타입 정의
    └── ui/             # 공통 UI 컴포넌트
```

## 🏗 아키텍처

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 따릅니다:

- **entities**: 비즈니스 엔티티 (도메인 모델)
- **features**: 비즈니스 기능 (사용자 시나리오)
- **widgets**: UI 위젯 (페이지 구성 요소)
- **shared**: 공유 리소스 (유틸리티, 설정 등)

### 커밋 컨벤션

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/)를 따릅니다:

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 변경
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 기타 작업

> 💡 **Git Hooks 설정에 문제가 있나요?** [Git Hooks 설정 안내서](./GIT_HOOKS_GUIDE.md)를 참고하세요!

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👥 팀

- **FESI 10th Team 6**

---

**같이달램**과 함께 더 나은 직장생활을 만들어가세요! 🚀
