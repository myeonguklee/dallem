# 모이자요 (Moizayo)

함께하는 모임으로 건강하고 활기찬 직장생활을 만들어보세요.

![모이자요 기본 이미지](./public/gathering-default-image.png)

배포 주소: https://moizayo.vercel.app

## 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [화면 소개](#-화면-소개)
3. [개발 환경](#️-개발-환경)
4. [기술 스택](#-기술-스택)
5. [기술 상세 설명](#기술-상세-설명)
6. [프로젝트 구조](#-프로젝트-구조)
7. [아키텍처](#-아키텍처)
8. [팀원 구성](#-팀원-구성)

## 📋 프로젝트 소개

**모이자요(Moizayo)**는 직장인들을 위한 **모임 플랫폼**입니다.

### 🎯 주요 기능

- **모임 생성 및 관리**: 다양한 주제의 모임을 만들고 관리
- **모임 참여**: 관심 있는 모임에 참여하여 동료들과 소통
- **찜한 모임**: 마음에 드는 모임을 즐겨찾기에 추가
- **리뷰**: 참여한 모임에 대한 후기 작성 및 공유
- **사용자 프로필**: 개인 정보 관리 및 참여/개설 모임 히스토리

### 🌟 핵심 가치

직장인들이 동료들과 함께 다양한 모임을 만들고 참여하여 더욱 풍요롭고 활기참 직장생활을 경험할 수 있도록 돕습니다.

## 화면 소개

### 기능 gif

### 모바일

### 다국어 지원

## 🛠️ 개발 환경

- **패키지 매니저:** pnpm
- **Node.js 버전:** 22.16.0 (`.nvmrc`, `.node-version` 참고)
- **코드 포맷터:** Prettier
- **lint-staged 설정:** `.lintstagedrc.js` 파일로 분리 관리
- **커밋 메시지 규칙:** Conventional Commits (commitlint로 검증)
- **Git Hooks 및 커밋 메시지 규칙:** [GIT_HOOKS_GUIDE.md](./GIT_HOOKS_GUIDE.md) 참고

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack React Query 5.81.5
- **Authentication**: Next Auth 4.24.11
- **Form**: React Hook Form 7.59.0 + Zod 3.25.73
- **UI Components**: Storybook 9.0.15 + 디자인 시스템 지향적인 컴포넌트
- **Internationalization**: next-intl 4.3.4 (다국어 지원)
- **Image Optimization**: Next.js Image 컴포넌트 + 웹워커 활용한 이미지 리사이징

### Development Tools

- **Linting & Formatting**: ESLint 9 + Prettier 3.6.2
- **Testing**: Jest 30.0.4 + React Testing Library 16.3.0 + MSW 2.10.3 (API Mocking)
- **Git Hooks**: Husky 9.1.7 + lint-staged 16.1.2
- **Commit Convention**: Commitlint 19.8.1 (Conventional Commits)
- **Type Checking**: TypeScript 5 strict mode
- **Code Quality**: ESLint rules + Prettier formatting

### Architecture & Patterns

- **Feature-Sliced Design (FSD)**: 도메인 중심의 폴더 구조
- **Component Architecture**: 재사용 가능한 UI 컴포넌트 설계
- **Error Handling**: 전역 에러 바운더리 및 사용자 친화적 에러 처리(토스트 메세지)

## 기술 상세 설명

### pnpm 패키지 매니저

### 다국어 지원(Next-intl)

### 디자인 시스템

### 스토리북

### 테스트 커버리지

### core web vitals

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 다국어 지원 (한국어/영어)
│   │   ├── (auth)/        # 인증 관련 페이지 (signin, signup)
│   │   ├── gathering/     # 모임 관련 페이지
│   │   ├── favorites/     # 찜한 모임 페이지
│   │   ├── reviews/       # 리뷰 페이지
│   │   ├── my-page/       # 마이페이지 (프로필, 참여/개설 모임, 리뷰)
│   │   └── layout.tsx     # 로케일별 레이아웃
│   ├── api/               # API 라우트 (NextAuth 등)
│   ├── fonts/             # 폰트 설정 (Pretendard)
│   ├── global-error.tsx   # 전역 에러 처리
│   ├── not-found.tsx      # 404 페이지
│   ├── providers.tsx      # React Query, NextAuth 등 프로바이더
│   └── layout.tsx         # 루트 레이아웃
├── entities/              # 도메인 엔티티 (비즈니스 모델)
│   ├── gathering/         # 모임 엔티티 (생성, 수정, 삭제)
│   ├── gathering-detail/  # 모임 상세 정보 엔티티
│   ├── participant/       # 참여자 엔티티
│   ├── review/            # 리뷰 엔티티
│   ├── favorites/         # 찜한 모임 엔티티
│   ├── auth/              # 인증 엔티티
│   └── user/              # 사용자 엔티티
├── features/              # 비즈니스 기능 (사용자 시나리오)
│   ├── gathering/         # 모임 관련 기능 (생성, 수정, 삭제)
│   ├── signin/            # 로그인 기능
│   ├── signup/            # 회원가입 기능
│   ├── favorites/         # 찜한 모임 관리 기능
│   ├── review/            # 리뷰 작성/관리 기능
│   ├── my-page/           # 마이페이지 기능
│   └── filters/           # 필터링 기능
├── widgets/               # UI 위젯 (페이지 구성 요소)
│   ├── Header/            # 헤더 위젯
│   ├── GatheringCard/     # 모임 카드 위젯
│   ├── GatheringList/     # 모임 목록 위젯
│   ├── ReviewList/        # 리뷰 목록 위젯
│   ├── AuthForm/          # 인증 폼 위젯
│   ├── MyPageSkeleton/    # 마이페이지 스켈레톤
│   ├── FavoritesSkeleton/ # 찜한 모임 스켈레톤
│   ├── ContainerInformation/ # 컨테이너 정보 위젯
│   ├── BottomFloatingBar/ # 하단 플로팅 바
│   └── AllReviewRating/   # 전체 리뷰 평점 위젯
├── shared/                # 공유 리소스
│   ├── api/               # API 관련 (HTTP 클라이언트, React Query)
│   ├── config/            # 설정 (라우트, API 엔드포인트)
│   ├── lib/               # 유틸리티 라이브러리 (날짜, 이미지, 테스트 등)
│   ├── hooks/             # 커스텀 훅
│   ├── types/             # 공통 타입 정의
│   └── ui/                # 공통 UI 컴포넌트 (Button, Input, Modal 등)
├── i18n/                  # 국제화 설정
└── messages/              # 다국어 메시지 (ko.json, en.json)
```

## 🏗 아키텍처

### API

### 📚 **Feature-Sliced Design (FSD)**

- **entities**: 비즈니스 엔티티 (도메인 모델)
  - 순수한 비즈니스 로직과 데이터 구조
  - 외부 의존성 없이 독립적으로 동작
  - 재사용 가능한 도메인 모델

- **features**: 비즈니스 기능 (사용자 시나리오)
  - 특정 사용자 액션을 위한 기능들
  - entities를 조합하여 비즈니스 로직 구현
  - UI 컴포넌트와 비즈니스 로직 연결

- **widgets**: UI 위젯 (페이지 구성 요소)
  - 여러 features를 조합한 복합 UI 컴포넌트
  - 페이지의 특정 섹션을 담당
  - 재사용 가능한 페이지 구성 요소

- **shared**: 공유 리소스
  - 유틸리티, 설정, 공통 컴포넌트
  - 모든 레이어에서 사용 가능
  - 프로젝트 전반의 공통 기능

## 👥 팀원 구성

|                                       FrontEnd (팀장)                                       |                                          FrontEnd                                          |                                          FrontEnd                                           |                                          FrontEnd                                           |
| :-----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/123948643?v=4" width=100px alt="이명욱"/> | <img src="https://avatars.githubusercontent.com/u/97427744?v=4" width=100px alt="박준우"/> | <img src="https://avatars.githubusercontent.com/u/174466862?v=4" width=100px alt="이유경"/> | <img src="https://avatars.githubusercontent.com/u/115933217?v=4" width=100px alt="이은지"/> |
|                          [이명욱](https://github.com/LEEMYEONGUK)                           |                           [박준우](https://github.com/always97)                            |                            [이유경](https://github.com/JuneYub)                             |                              [이은지](https://github.com/E-J1)                              |

**모이자요**과 함께 더 나은 직장생활을 만들어가세요! 🚀
