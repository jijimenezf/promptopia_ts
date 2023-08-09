import { NextRouter } from 'next/router';

/**
 * This function acts a request dispatcher. Whan the fetch API is executed from a component,
 * a response is returned as is recevied in the parameter
 * @param data mokced data written for unit testing
 * @returns the data that is going to be used for the unit test
 */
export function mockFetch<TData>(data: TData | TData[]) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

export const mockNextRouter = (router: Partial<NextRouter>): NextRouter => ({
  basePath: '',
  pathname: '',
  route: '',
  query: {},
  asPath: '/',
  back: jest.fn(),
  beforePopState: jest.fn(),
  prefetch: jest.fn(),
  push: jest.fn(),
  reload: jest.fn(),
  forward: jest.fn(),
  replace: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
  ...router,
});
