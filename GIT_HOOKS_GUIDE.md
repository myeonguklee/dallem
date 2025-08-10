# 🚀 Git Hooks & 커밋 메시지 규칙 안내서

이 문서는 [README.md](./README.md)에 안내된 개발 환경 세팅을 완료한 후, Git Hooks 및 커밋 메시지 규칙, 문제 해결 방법을 안내합니다.

> 개발 환경 세팅, pnpm/Node.js 버전, lint-staged 등은 README.md를 참고하세요.

## 🎯 Conventional Commits 규칙

이 프로젝트는 Conventional Commits 표준을 따르며, commitlint로 커밋 메시지 규칙을 검증합니다.

### 지원하는 타입

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 변경
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 기타 작업
- `design`: CSS 등 사용자 UI/UX 변경
- `comment`: 필요한 주석 추가 및 변경
- `rename`: 파일 또는 폴더 이름 변경
- `remove`: 파일 또는 폴더 삭제
- `perf`: 성능 개선
- `ci`: CI/CD 관련
- `hotfix`: 긴급 수정

## 📋 Commit 시 체크리스트

### ❌ Commit이 안 될 때 (pre-commit hook)

**1. ESLint 에러가 있는 경우**

```bash
# 에러 확인
pnpm run lint

# 자동 수정 시도
pnpm run lint:fix
```

**2. Prettier 포맷팅 문제**

```bash
# 포맷팅 확인
pnpm run format:check

# 자동 포맷팅
pnpm run format
```

**3. 수동으로 lint-staged 실행**

```bash
pnpx lint-staged
```

### ❌ Commit 메시지가 거부될 때 (commit-msg hook)

**1. 커밋 타입이 잘못된 경우**

```bash
# 올바른 타입 사용
feat: 새로운 기능
fix: 버그 수정
docs: 문서 변경
style: 코드 스타일 변경
refactor: 리팩토링
test: 테스트 추가/수정
chore: 기타 작업
design: CSS 등 사용자 UI/UX 변경
comment: 필요한 주석 추가 및 변경
rename: 파일 또는 폴더 이름 변경
remove: 파일 또는 폴더 삭제
perf: 성능 개선
ci: CI/CD 관련
hotfix: 긴급 수정
```

**2. 제목에 마침표가 있는 경우**

```bash
# ❌ 잘못된 예시
feat: 새로운 기능.

# ✅ 올바른 예시
feat: 새로운 기능
```

> 커밋 제목의 첫 글자는 대소문자 모두 허용됩니다! (예: `feat: FSD 아키텍처 구현` 가능)

**3. 제목이 너무 긴 경우 (72자 초과)**

```bash
# ❌ 잘못된 예시
feat: 매우 긴 제목을 사용하면 안됩니다. 이렇게 하면 72자를 초과하게 됩니다.

# ✅ 올바른 예시
feat: 긴 제목은 본문에 상세 내용 작성
```

## 📋 Push 시 체크리스트

### ❌ Push가 안 될 때 (pre-push hook)

**1. TypeScript 타입 에러**

```bash
# 타입 체크
pnpm run type-check

# 에러 수정 후 다시 시도
```

**2. 테스트 실패**

```bash
# 테스트 실행
pnpm test

# 실패한 테스트 수정 후 다시 시도
```

**3. 수동으로 pre-push 검사**

```bash
pnpm run type-check
pnpm test
```

## 🔧 문제 해결 방법

### 1. Husky 재설치

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
pnpm install

# Husky 재설정
pnpm run prepare
```

### 2. lint-staged 캐시 클리어

```bash
# 캐시 삭제
pnpx lint-staged --clear-cache
```

## 📝 커밋 메시지 템플릿

### 기능 추가

```bash
feat: 사용자 로그인 기능 추가

- 이메일/비밀번호 로그인 구현
- JWT 토큰 기반 인증
- 로그인 상태 관리
```

### 버그 수정

```bash
fix: 로그인 후 리다이렉트 문제 해결

- 로그인 성공 시 홈페이지로 이동하도록 수정
- 세션 유지 로직 개선
```

### 리팩토링

```bash
refactor: 컴포넌트 구조 개선

- 중복 코드 제거
- 컴포넌트 분리
- 타입 안정성 향상
```

## 🚨 자주 발생하는 에러

### ESLint 에러

```bash
# import 순서 문제
pnpm run lint:fix

# 사용하지 않는 변수
# 변수명을 언더스코어로 시작하거나 삭제
const _unusedVariable = 'value';
```

### TypeScript 에러

```bash
# 타입 정의 누락
interface Props {
  title: string;
  description?: string;
}

# any 타입 사용 금지
// ❌
const data: any = response.data;

// ✅
interface ApiResponse {
  data: User[];
}
const data: ApiResponse = response.data;
```

### 테스트 에러

```bash
# 테스트 파일 수정
# 실제 컴포넌트와 일치하도록 테스트 업데이트
```

## 💡 팁

1. **커밋 전 미리 검사하기**

   ```bash
   pnpx lint-staged
   pnpm run type-check
   pnpm test
   ```

2. **IDE 설정 활용하기**
   - ESLint 확장 프로그램 설치
   - Prettier 확장 프로그램 설치
   - 저장 시 자동 포맷팅 설정

3. **작은 단위로 커밋하기**
   - 한 번에 여러 기능을 커밋하지 말기
   - 논리적으로 분리된 단위로 커밋하기
