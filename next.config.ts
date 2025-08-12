import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
// Bundle Analyzer 설정
import bundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // 이미지 도메인 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    // 이미지 최적화 설정 (환경변수로 제어 가능)
    ...(process.env.DISABLE_IMAGE_OPTIMIZATION === 'true'
      ? {
          // 최적화 비활성화 시 기본 설정
          unoptimized: true,
        }
      : {
          formats: ['image/webp'],
          deviceSizes: [640, 750, 828, 1200],
          imageSizes: [16, 32, 48, 64, 96, 128],
        }),
  },
  // 번들 최적화 설정
  experimental: {
    // 특정 패키지의 번들 최적화
    optimizePackageImports: [
      '@tanstack/react-query',
      'react-hook-form',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
    ],
  },
  // 컴파일러 최적화 설정
  compiler: {
    // 프로덕션에서 console 제거
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Turbopack 설정 (개발 환경)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Webpack 설정 (빌드 환경)
  webpack: (config, { isServer }) => {
    // SVG 처리
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Web Worker 설정 (클라이언트 사이드만)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
};

export default withBundleAnalyzer(withSentryConfig(withNextIntl(nextConfig)));
