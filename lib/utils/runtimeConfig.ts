import getConfig from 'next/config'

interface RuntimeConfig {
  HOST: string
  PRODUCTION: string
  IS_TEST_ENV: string
  SENTRY_DSN?: string
}

export function getRuntimeConfig(): RuntimeConfig {
  const runtimeConfig = getConfig()?.publicRuntimeConfig
  if (runtimeConfig) {
    return runtimeConfig
  }
  // FIXME: 실제 사용할 value 로 수정
  return {
    HOST: 'http://localhost:8080/api',
    PRODUCTION: 'false',
    IS_TEST_ENV: 'true',
  }
}
