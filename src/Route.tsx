import { LazyExoticComponent } from 'react';

export type RouteParams = { query: string };

export interface ComponentDefaultProps {
  routeParams: RouteParams;
}

type RouteComponent = (props: ComponentDefaultProps) => JSX.Element;

export interface RouteProps {
  path: string;
  Component: RouteComponent | LazyExoticComponent<RouteComponent>;
}

export function Route(_props: RouteProps) {
  return null;
}

Route.displayName = 'Route';
