import { useState, useEffect, Children } from 'react';
import { EVENTS } from './constants';
import { match } from 'path-to-regexp';

type RouteParams = { query: string };

interface Props {
  routes: Array<{
    path: string;
    Component: ({ routeParams }: { routeParams: RouteParams }) => JSX.Element;
  }>;
  defaultComponent: ({
    routeParams,
  }: {
    routeParams: RouteParams;
  }) => JSX.Element;
}

function Router({
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}: Props) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams: RouteParams;

  // Routes from children <Route /> components
  /*  const routesFromChildren = Children.map((children) => {
    const { type, props } = children;
    const { name } = type;
    const isRoute = name === 'Route';

    return isRoute ? props : null;
  }).filter; */

  const Page = routes.find(({ path }) => {
    if (path === currentPath) return true;

    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) return false;

    routeParams = matched.params;
    return true;
  })?.Component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}

export default Router;
