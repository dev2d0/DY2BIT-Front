/** @type {import('next').NextConfig} */
const packageDependencies = require('./package.json').dependencies

// eslint-disable-next-line import/order
const withTM = require('next-transpile-modules')(
  Object.keys(packageDependencies).filter(dep => dep.startsWith('@tada')),
  { resolveSymlinks: true }
)

const basePath = ''

const nextConfig = withTM({
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
  // STOPSHIP: don't know what to do
  images: {
    domains: ['tadatada.com'],
    quality: 75,
    deviceSizes: [640, 750, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
  experimental: {
    esmExternals: false,
  },
})

// eslint-disable-next-line no-undef
module.exports = nextConfig
