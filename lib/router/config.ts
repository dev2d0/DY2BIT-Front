export interface IPageConfig {
  build: (...args: Array<string>) => string
  pattern: string
  title?: string
}

export class PageConfigItem {
  constructor(public props: IPageConfig) {}
}

export const pageConfig = {
  login: new PageConfigItem({
    build: () => '/login',
    pattern: '/login',
  }),
}
