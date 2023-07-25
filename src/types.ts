export type RouteParams = { query: string };

export interface ComponentDefaultProps {
  routeParams: RouteParams;
}

export interface RouteProps {
  path: string;
  Component: (props: ComponentDefaultProps) => JSX.Element;
}
