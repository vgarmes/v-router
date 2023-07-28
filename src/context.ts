import { createContext, useContext } from 'react';

interface RouterContext {
  path: string;
  asPath: string;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
  navigate: (href: string) => void;
}

export const RouterContext = createContext<RouterContext>(null!);

export function useRouter() {
  return useContext(RouterContext);
}
