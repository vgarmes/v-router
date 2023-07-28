import { LazyExoticComponent } from 'react';

type RouteComponent = () => JSX.Element;

export interface RouteProps {
  path: string;
  Component: RouteComponent | LazyExoticComponent<RouteComponent>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Route(_props: RouteProps) {
  return null;
}

Route.displayName = 'Route';
