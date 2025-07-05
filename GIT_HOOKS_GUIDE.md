# 🚀 Git Hooks 설정 안내서

이 프로젝트는 코드 품질을 위해 Git Hooks를 사용합니다. 팀원들이 쉽게 따라할 수 있도록 체크리스트 형태로 안내합니다.

## 📋 Commit 시 체크리스트

### ❌ Commit이 안 될 때 (pre-commit hook)

**1. ESLint 에러가 있는 경우**

```bash
# 에러 확인
npm run lint

# 자동 수정 시도
npm run lint:fix
```

**2. Prettier 포맷팅 문제**

```bash
# 포맷팅 확인
npm run format:check

# 자동 포맷팅
npm run format
```

**3. 수동으로 lint-staged 실행**

```bash
npx lint-staged
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
```

**2. 제목에 대문자나 마침표가 있는 경우**

```bash
# ❌ 잘못된 예시
chore: FSD 아키텍처 적용
feat: 새로운 기능.

# ✅ 올바른 예시
chore: fsd 아키텍처 적용
feat: 새로운 기능
```

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
npm run type-check

# 에러 수정 후 다시 시도
```

**2. 테스트 실패**

```bash
# 테스트 실행
npm test

# 실패한 테스트 수정 후 다시 시도
```

**3. 수동으로 pre-push 검사**

```bash
npm run type-check
npm test
```

## 🔧 문제 해결 방법

### 1. Husky 재설치

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install

# Husky 재설정
npm run prepare
```

### 2. lint-staged 캐시 클리어

```bash
# 캐시 삭제
npx lint-staged --clear-cache
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
npm run lint:fix

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
   npm run lint
   npm run type-check
   npm test
   ```

2. **IDE 설정 활용하기**
   - ESLint 확장 프로그램 설치
   - Prettier 확장 프로그램 설치
   - 저장 시 자동 포맷팅 설정

3. **작은 단위로 커밋하기**
   - 한 번에 여러 기능을 커밋하지 말기
   - 논리적으로 분리된 단위로 커밋하기

---

**문제가 지속되면 팀원들과 상의하거나 이슈를 등록해주세요!** 🆘
