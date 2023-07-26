import { useState, useEffect, Children, PropsWithChildren } from 'react';
import { EVENTS } from '../constants';
import { match } from 'path-to-regexp';
import { ComponentDefaultProps, RouteParams, RouteProps } from '../router';
import { getCurrentPath } from './utils';

interface Props {
  routes?: Array<RouteProps>;
  defaultComponent?: (props: ComponentDefaultProps) => JSX.Element;
}

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}: PropsWithChildren<Props>) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(getCurrentPath());

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams: RouteParams = { query: '' };

  // Routes from children <Route /> components
  const routesFromChildren =
    Children.map(children, (child) => {
      const { props, type } = child as JSX.Element;
      const { name } = type;
      const isRoute = name === 'Route';

      return isRoute ? (props as RouteProps) : null;
    })?.filter(Boolean) || [];

  const routesToUse = [...routes, ...routesFromChildren];

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) return false;

    routeParams = matched.params as { query: string };
    return true;
  })?.Component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}

Router.displayName = 'Router';
