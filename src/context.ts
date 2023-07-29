import { createContext, useContext } from 'react';
import { PathObject } from './utils';

interface RouterContext {
  pathname: string;
  asPath: string;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
  navigate: (to: string | PathObject) => void;
}

export const RouterContext = createContext<RouterContext>(null!);

export function useRouter() {
  return useContext(RouterContext);
}
