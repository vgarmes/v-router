import { ReactNode } from 'react';

export interface RouteProps {
  path: string;
  element: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Route(_props: RouteProps) {
  return null;
}

Route.displayName = 'Route';
