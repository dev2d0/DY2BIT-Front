/** @type {import('next').NextConfig} */
const basePath = ''

const nextConfig = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'ko',
  },
  basePath,
  assetPrefix: process.env.ASSET_PREFIX,
  crossOrigin: 'anonymous', // CDN 사용할 때 CORS 헤더 없는 캐시 방지
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    PRODUCTION: process.env.PRODUCTION,
    USE_PROXY: process.env.USE_PROXY,
    IS_TEST_ENV: process.env.IS_TEST_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
}

// eslint-disable-next-line no-undef
module.exports = nextConfig
