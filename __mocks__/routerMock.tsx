import * as ReactTesting from '@testing-library/react'

jest.mock('next/navigation', () => ({
  push: jest.fn(),
  back: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: jest.fn(() => "/profile"),
  useSearchParams: () => ({
    get: jest.fn(() => "3891100029"),
  }),
}));
