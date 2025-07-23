import { getBreakpointsPx } from './getBreakpointsPx';

describe('getBreakpointsPx', () => {
  let mockGetComputedStyle: jest.Mock;

  beforeEach(() => {
    mockGetComputedStyle = jest.fn();
    Object.defineProperty(window, 'getComputedStyle', {
      value: mockGetComputedStyle,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('rem 값을 픽셀로 올바르게 변환해야 합니다', () => {
    // Mock CSS variables
    mockGetComputedStyle.mockReturnValue({
      fontSize: '16px',
      getPropertyValue: jest.fn().mockImplementation((property) => {
        const breakpoints: Record<string, string> = {
          '--breakpoint-mobile': '32rem',
          '--breakpoint-tablet': '48rem',
          '--breakpoint-web': '75rem',
          '--breakpoint-desktop': '120rem',
        };
        return breakpoints[property] || '0';
      }),
    });

    const breakpoints = getBreakpointsPx();

    expect(breakpoints).toEqual({
      mobile: 512, // 32rem * 16px
      tablet: 768, // 48rem * 16px
      web: 1200, // 75rem * 16px
      desktop: 1920, // 120rem * 16px
    });
  });
});
