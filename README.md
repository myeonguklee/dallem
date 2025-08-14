# 모이자요 (Moizayo)

함께하는 모임으로 건강하고 활기찬 직장생활을 만들어보세요.

![모이자요 온보딩](https://github.com/user-attachments/assets/2394fe4d-37e4-48d1-9c17-8241fb5548a3)

배포 주소: https://moizayo.vercel.app

### [프로젝트 전체 리드미](https://github.com/FESI-10th-team6/moizayo)

## 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [기술 스택](#-기술-스택)
3. [개발 사항](#-개발-사항)
4. [다국어 지원(next-intl)](#-다국어-지원(next-intl))
5. [core web vitals 개선](#-core-web-vitals-개선)
6. [API 아키텍처](#-API-아키텍처)
7. [CI/CD](#-CI/CD)
8. [기술 상세 설명](#-기술-상세-설명)

## 📋 프로젝트 소개

**모이자요(Moizayo)** 는 직장인들을 위한 **모임 플랫폼**입니다.

### 🎯 주요 기능

- **모임 생성 및 관리**: 다양한 주제의 모임을 만들고 관리
- **모임 참여**: 관심 있는 모임에 참여하여 마음 힐링 및 소통
- **찜한 모임**: 마음에 드는 모임을 찜한 목록에 추가
- **리뷰**: 참여한 모임에 대한 후기 작성 및 공유
- **사용자 프로필**: 개인 정보 관리 및 참여/개설 모임 히스토리

### 🌟 핵심 가치

직장인들이 다양한 모임을 만들고 참여하여 더욱 풍요롭고 활기찬 직장생활을 할 수 있도록 돕습니다.

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

- **Pakage Manager**: pnpm
- **Node.js**: 22.16.0
- **Linting & Formatting**: ESLint 9 + Prettier 3.6.2
- **Testing**: Jest 30.0.4 + React Testing Library 16.3.0 + MSW 2.10.3 (API Mocking)
- **Git Hooks**: Husky 9.1.7 + lint-staged 16.1.2
- **Commit Convention**: Commitlint 19.8.1 (Conventional Commits)
- **Type Checking**: TypeScript 5 strict mode
- **Code Quality**: ESLint rules + Prettier formatting

### Architecture & Patterns

- **Feature-Sliced Design (FSD)**: 도메인 중심의 폴더 구조
- **Component Architecture**: 재사용 가능한 UI 컴포넌트 설계
- **Error Handling**: 전역 에러 바운더리 및 사용자 친화적 에러 처리(토스트 메시지)

## 🖥️ 개발 사항

1.	성능 최적화 및 사용자 경험 개선
-	웹 워커를 활용한 이미지 리사이징으로 폼 전송 속도 개선, 2mb 이미지 기준 서버 저장 용량 90% 감소
-	SEO 최적화, 웹 접근성 개선으로 lighthouse 성능 점수 92점 -> 100점, 86점 -> 96점 달성, 사용자 포용성 향상

2.	개발 생산성 및 코드 품질 향상
-	Git husky, lint-staged 기반 커밋 단계 코드 검증으로 배포 오류 사전 방지 및 테스트 자동화
-	Github actions CI/CD 파이프라인 구축으로 배포 자동화 및 개발 효율성 향상
-	Frontend API 아키텍처 설계로 중앙화된 에러 처리, 성능 및 에러 모니터링(sentry) 통합 관리

3.	글로벌 서비스 기반 마련
-	next-intl을 활용한 다국어(i18n) 지원으로 언어적 제약 해소

4. 모임 찾기(목록) 페이지, 마이 페이지 구현

<details>
<summary><strong>기능 gif</strong></summary>
|                                       필터링- 타입                                   |                                         필터링-지역/날짜/정렬                                     |
| :------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/3377c2a7-a3e3-425e-bef5-fb1d599bd89e)| ![Image](https://github.com/user-attachments/assets/cfcf53cf-29be-470a-a0a8-631e49e0d7d5) |

|                                       무한스크롤                                   |                                         모임생성하기                                     |
| :------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/743926bc-a305-4c28-a307-b34a498536bd) | ![Image](https://github.com/user-attachments/assets/620b2be8-0132-4d9f-b215-7d522b8fded7) |

|                                      마이페이지 조회                                |                                         프로필 변경                                  |
| :------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/8870eca7-7ae8-4824-9c5a-c65d3a44bb74) | ![Image](https://github.com/user-attachments/assets/3b8f5944-37d4-48c3-86b9-da6ab668bfb6) |

|                                      리뷰 등록                                ||
| :------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/8d568fc6-ff56-4364-8757-b76c9c9970b6) ||
</details>

<details>
<summary><strong>모바일</strong></summary>
  
</details>

## 🌎 다국어 지원(next-intl)

![next-intl](https://github.com/user-attachments/assets/b5794bd1-f8a1-4f0e-b5a1-ec33168d73f2)

#### **next-intl 라이브러리 선택 이유**

- 타입 안정성
- app-router와 호환성
- 성능 최적화(트리 쉐이킹)

#### **SSR 환경에서의 동적 언어 전환 문제**

- 초기 렌더링 이후 언어 변경 시 SSR된 컴포넌트들이 번역되지 않는 이슈
- **해결**: URL params 기반 locale 전달로 서버 컴포넌트 번역 동기화 구현

#### **다국어 구현 과정에서의 시행착오와 개선**

- 초기 설계: next-intl 최신 버전 공식문서의 권장대로 locale, message(번역 json) 자동 주입 방식으로 구성
- next-intl의 `useLocale()` 훅이 올바른 locale을 반환하지 않는 문제 발생
- **임시 해결**: `usePathname()`으로 URL에서 locale 추출하여 활용하는 안티패턴 사용
- Next.js `Link`와 next-intl `Link` 혼용으로 라우팅 불일치 및 locale prefix 누락
- 코드 복잡성 증가와 유지보수성 저하 문제 인식
- **해결**: 다국어 지원 설정 전면 점검 및 구조 개선, locale, message 직접 주입 설정으로 변경하여 locale context 문제 해결
- next-intl의 `Link` 및 `useLocale()` 사용으로 컴포넌트 통일
- 불필요한 안티패턴 제거 및 코드 간소화

#### **구조화된 번역 파일 관리**

- `ui`, `pages` 등 도메인별 번역 키 분리로 네임스페이스 기반 선택적 사용 및 로드
- 431개의 번역 키를 계층적 구조로 관리하여 타입 안전성과 유지보수성 향상(ko.json, en.json)

<details>
<summary><strong>다국어 지원 구현 사항</strong></summary>
  
</details>

## 🚀 core web vitals 개선

|                                         초기 배포(7월 29일)                                          |                                         최근 배포(8월 11일)                                          |
| :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| ![라이트하우스(전)](https://github.com/user-attachments/assets/79457f12-3069-4d5e-a88f-748ccc84fd56) | ![라이트하우스(후)](https://github.com/user-attachments/assets/b621fbcf-17bf-49ab-9114-60b8fb6b5c76) |

#### Performance 87점 -> 89점 (2점 상승)

- Next Image 최적화
- 이미지 리사이징 및 Webp 변환(웹워커)
- ~~가상화 적용~~ <- 렌더링 최적화에는 효과적이지만 복잡한 js구조로 Performance 점수 하락
- 번들 분석 결과 초기 로드에 포함된 react-day-picker 라이브러리 다이내믹 임포트
- Promise.all을 활용하여 api요청 병렬 처리

#### Accessibility 86점 -> 96점 (10점 상승)

- 시맨틱 태그 사용
- 키보드 액션 지원
- 스크린 리더 사용자를 위한 aria-label 제공
- 저시력자를 위한 낮은 색 대비율 디자인 개선

#### SEO 92점 -> 100점 (8점 상승)

- 다국어 지원을 고려한 메타 데이터 및 Open Graph 설정
![open graph](https://github.com/user-attachments/assets/044ebdb7-cadf-41a2-b78f-4803564fe806)

- [사이트맵 설정](https://moizayo.vercel.app/sitemap.xml)과 robots.txt을 통한 검색 엔진 접근 최적화

## 📡 API 아키텍처

![API아키텍처](https://github.com/user-attachments/assets/0ae55fd8-ee97-42c0-a8ca-057df9b9b4ab)

#### **커스텀 에러 처리 시스템**

- `ApiError` 커스텀 에러 클래스로 서버 에러 메시지를 그대로 사용자에게 전달
- HTTP 상태 코드와 에러 코드를 포함한 구조화된 에러 객체
- 네트워크 에러와 HTTP 에러를 구분하여 적절한 메시지 제공

#### **인증 및 보안**

- Axios 인터셉터를 통한 자동 JWT 토큰 관리
- 401 에러 시 자동 로그아웃 및 로그인 페이지 리다이렉트
- 다국어 환경에서의 locale 기반 리다이렉트 처리

#### **성능 최적화**

- Tanstack Query를 활용한 서버 상태 관리 및 캐싱
- API 응답 성능 모니터링 (Sentry 연동)

## ✅ CI/CD

![CI/CD](https://github.com/user-attachments/assets/b1993de0-d8e3-410f-8eee-41b8bb2beaee)

#### **코드 품질 관리**

- Husky + lint-staged를 통한 커밋 전 코드 품질 검사
- ESLint, Prettier 자동 실행으로 배포 에러 사전 예방
- 일관된 코드 스타일과 규칙 강제

#### **자동화된 배포 파이프라인**

- GitHub Actions를 통한 자동화된 배포
- 코드 품질 검사 및 테스트 자동화
- Vercel을 통한 무중단 배포

## 🛠 기술 상세 섦영

<details>
<summary><strong>📦 pnpm 패키지 매니저</strong></summary>

![pnpm](https://github.com/user-attachments/assets/7ba2d0be-1372-4420-a2f1-b941bf72de8e)

#### 테스트 결과(모이자요 프로젝트, 의존성 수: 1,405 패키지)

|                                          설치 시간                                           |                                          디스크 사용량                                           |
| :------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: |
| ![설치시간](https://github.com/user-attachments/assets/6a768366-2bd3-4621-9a7f-433ddb7cbfce) | ![디스크사용량](https://github.com/user-attachments/assets/e1267e61-df1d-4921-92d9-1dc96b86d8d3) |

#### pnpm의 장점

- 빠른 설치: npm 대비 2.4배 빠름
- 효율적인 공간 사용: yarn 대비 79MB 절약
- 안정성: 스트릭트 의존성 관리

#### pnpm의 단점

- 호환성 이슈: 일부 레거시 패키지에서 symlink 관련 문제 발생 가능
- 생태계: npm/yarn 대비 상대적으로 작은 커뮤니티

=> 프로젝트 규모가 커질수록 속도와 공간 측면에서 장점이 더 커질 것이라고 예상
  
</details>

<details>
<summary><strong>📁 프로젝트 구조</strong></summary>
  
```
📦src/
├── 📂app/                    # Next.js App Router
│   ├── 📂[locale]/          # 다국어 지원 (한국어/영어)
│   │   ├── 📂(auth)/        # 인증 관련 페이지 (signin, signup)
│   │   ├── 📂gathering/     # 모임 관련 페이지
│   │   ├── 📂favorites/     # 찜한 모임 페이지
│   │   ├── 📂reviews/       # 리뷰 페이지
│   │   ├── 📂my-page/       # 마이페이지 (프로필, 참여/개설 모임, 리뷰)
│   │   └── 📜layout.tsx     # 로케일별 레이아웃
│   ├── 📂api/               # API 라우트 (NextAuth 등)
│   ├── 📂fonts/             # 폰트 설정 (Pretendard)
│   ├── 📜global-error.tsx   # 전역 에러 처리
│   ├── 📜not-found.tsx      # 404 페이지
│   ├── 📜providers.tsx      # React Query, NextAuth 등 프로바이더
│   └── 📜layout.tsx         # 루트 레이아웃
├── 📂entities/              # 도메인 엔티티 (비즈니스 모델)
│   ├── 📂gathering/         # 모임 엔티티 (생성, 수정, 삭제)
│   ├── 📂gathering-detail/  # 모임 상세 정보 엔티티
│   ├── 📂participant/       # 참여자 엔티티
│   ├── 📂review/            # 리뷰 엔티티
│   ├── 📂favorites/         # 찜한 모임 엔티티
│   ├── 📂auth/              # 인증 엔티티
│   └── 📂user/              # 사용자 엔티티
├── 📂features/              # 비즈니스 기능 (사용자 시나리오)
│   ├── 📂gathering/         # 모임 관련 기능 (생성, 수정, 삭제)
│   ├── 📂signin/            # 로그인 기능
│   ├── 📂signup/            # 회원가입 기능
│   ├── 📂favorites/         # 찜한 모임 관리 기능
│   ├── 📂review/            # 리뷰 작성/관리 기능
│   ├── 📂my-page/           # 마이페이지 기능
│   └── 📂filters/           # 필터링 기능
├── 📂widgets/               # UI 위젯 (페이지 구성 요소)
│   ├── 📂Header/            # 헤더 위젯
│   ├── 📂GatheringCard/     # 모임 카드 위젯
│   ├── 📂GatheringList/     # 모임 목록 위젯
│   ├── 📂ReviewList/        # 리뷰 목록 위젯
│   ├── 📂AuthForm/          # 인증 폼 위젯
│   ├── 📂MyPageSkeleton/    # 마이페이지 스켈레톤
│   ├── 📂FavoritesSkeleton/ # 찜한 모임 스켈레톤
│   ├── 📂ContainerInformation/ # 컨테이너 정보 위젯
│   ├── 📂BottomFloatingBar/ # 하단 플로팅 바
│   └── 📂AllReviewRating/   # 전체 리뷰 평점 위젯
├── 📂shared/                # 공유 리소스
│   ├── 📂api/               # API 관련 (HTTP 클라이언트, React Query)
│   ├── 📂config/            # 설정 (라우트, API 엔드포인트)
│   ├── 📂lib/               # 유틸리티 라이브러리 (날짜, 이미지, 테스트 등)
│   ├── 📂hooks/             # 커스텀 훅
│   ├── 📂types/             # 공통 타입 정의
│   └── 📂ui/                # 공통 UI 컴포넌트 (Button, Input, Modal 등)
├── 📂i18n/                  # 국제화 설정
└── 📂messages/              # 다국어 메시지 (ko.json, en.json)
```
  
</details>

<details>
<summary><strong>📚 Feature-Sliced Design (FSD)</strong></summary>

![fsd](https://github.com/user-attachments/assets/4955916f-cdbd-4f65-9593-aea68e66be2c)

#### 도입 배경

- 프로젝트 기획 단계에서 **기능 확장성**과 **팀원 4명의 동시 작업 효율성**을 고려해, 적절한 아키텍처의 필요성을 느낌
- 기존의 단순 컴포넌트 폴더 구조는 프로젝트 규모가 커질수록 **의존성 얽힘**과 **유지보수 어려움**을 유발할 가능성이 있음

=> **도메인 중심 설계**와 **관심사 분리**를 체계적으로 적용할 수 있는 `Feature-Sliced Design(FSD)` 아키텍처를 **초기부터 도입**

⚡ **핵심 원칙 — 단방향 의존성**

> 상위 레이어는 하위 레이어에만 의존할 수 있다.  
> 이를 통해 코드 흐름이 예측 가능해지고, 의도치 않은 사이드 이펙트를 원천 차단.

```plaintext
app → entities → features → widgets → shared
```

#### FSD 도입을 통해 얻은 효과

- **개발 생산성 향상 및 병렬 작업 용이성**
  ```plaintext
  entities/
    ├─ gathering/   # 모임 페이지 관련
    └─ user/        # 로그인·회원가입 관련
  ```
  **`entities/gathering`** 와 **`entities/user`** 는 서로 다른 **슬라이스(slice)** 에 속함 <br>
  **각 슬라이스는 기능별로 완전히 독립**되어 있어, 팀원들이 **각자 맡은 기능에 집중** 가능 <br>
  → `코드 충돌(merge conflict) 최소화 및 개발 속도 향상`
- **유지보수 비용 감소 및 높은 응집도**<br>
  변경이 필요할 경우 해당 도메인 폴더만 확인하면 됨 <br>
  관련된 UI·API 호출·상태 로직이 하나의 슬라이스에 모여 있어 변경 범위 예측이 명확하고,
  그 결과 유지보수 비용 감소

</details>
