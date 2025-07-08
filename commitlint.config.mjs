const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // ✅ 새로운 기능
        'fix', // ✅ 버그 수정
        'docs', // ✅ 문서 변경
        'style', // ✅ 코드 스타일 변경
        'refactor', // ✅ 리팩토링
        'test', // ✅ 테스트 추가/수정
        'chore', // ✅ 기타 작업
        'design', // ✅ CSS 등 사용자 UI/UX 변경
        'comment', // ✅ 필요한 주석 추가 및 변경
        'rename', // ✅ 파일 또는 폴더 이름 변경
        'remove', // ✅ 파일 또는 폴더 삭제
        'perf', // ✅ 성능 개선
        'ci', // ✅ CI/CD 관련
        'hotfix', // ✅ 급한 버그 수정
      ],
    ],
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']], // ✅ 소문자 시작
    'subject-full-stop': [2, 'never', '.'], // ✅ 마침표 금지
    'subject-max-length': [2, 'always', 72], // ✅ 최대 72자
    'subject-min-length': [2, 'always', 1], // ✅ 최소 1자
    'body-max-line-length': [2, 'always', 100], // ✅ 본문 최대 100자
  },
};

export default config;
