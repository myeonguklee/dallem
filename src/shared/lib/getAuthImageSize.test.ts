import { IMAGE_SIZE_BY_BREAKPOINTS, getAuthImageSize } from './getAuthImageSize';

// getBreakpointsPx 모킹
jest.mock('./getBreakpointsPx', () => ({
  getBreakpointsPx: jest.fn().mockReturnValue({
    mobile: 375, // 실제 CSS 변수 값과 일치시킴
    tablet: 744, // --breakpoint-tablet: 46.5rem (46.5 * 16 = 744px)
    web: 1200, // --breakpoint-web: 75rem (75 * 16 = 1200px)
    desktop: 1920, // --breakpoint-desktop: 120rem (120 * 16 = 1920px)
  }),
}));

describe('getAuthImageSize', () => {
  it('모바일 화면(744px 미만)에서는 290을 반환해야 함', () => {
    expect(getAuthImageSize(375)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.mobile); // 아이폰 XR
    expect(getAuthImageSize(743)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.mobile); // 태블릿 직전
  });

  it('태블릿 화면(744px 이상 1200px 미만)에서는 407을 반환해야 함', () => {
    expect(getAuthImageSize(744)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.tablet); // 태블릿 시작
    expect(getAuthImageSize(1024)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.tablet); // 아이패드
    expect(getAuthImageSize(1199)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.tablet); // 웹 직전
  });

  it('웹 화면(1200px 이상)에서는 588을 반환해야 함', () => {
    expect(getAuthImageSize(1200)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.web); // 웹 시작
    expect(getAuthImageSize(1440)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.web); // 일반적인 웹
    expect(getAuthImageSize(1920)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.web); // 큰 모니터
  });

  it('경계값 테스트: 743px은 모바일 사이즈를 반환해야 함', () => {
    expect(getAuthImageSize(743)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.mobile);
  });

  it('경계값 테스트: 744px은 태블릿 사이즈를 반환해야 함', () => {
    expect(getAuthImageSize(744)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.tablet);
  });

  it('경계값 테스트: 1199px은 태블릿 사이즈를 반환해야 함', () => {
    expect(getAuthImageSize(1199)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.tablet);
  });

  it('경계값 테스트: 1200px은 웹 사이즈를 반환해야 함', () => {
    expect(getAuthImageSize(1200)).toBe(IMAGE_SIZE_BY_BREAKPOINTS.web);
  });
});
