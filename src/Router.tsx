import { useState, useEffect, Children, PropsWithChildren } from 'react';
import { EVENTS } from './constants';
import { match } from 'path-to-regexp';
import { RouteProps } from './';
import { getCurrentPath, getQueryParams } from './utils';
import { RouterContext } from './context';

interface Props {
  routes?: Array<RouteProps>;
  defaultComponent?: () => JSX.Element;
}

function navigate(href: string) {
  window.history.pushState({}, '', href);
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}: PropsWithChildren<Props>) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());
  const [currentQuery, setCurrentQuery] = useState(getQueryParams());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
      setCurrentQuery(getQueryParams());
    };
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let params: Record<string, string> = {};
  let routePath: string = '';
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
    if (path === currentPath) {
      routePath = path;
      return true;
    }

    const matcherUrl = match(path, { decode: decodeURIComponent });

    const matched = matcherUrl(currentPath);
    if (!matched) return false;

    params = matched.params as Record<string, string>;
    routePath = path;
    return true;
  })?.Component;

  return (
    <RouterContext.Provider
      value={{
        path: routePath,
        asPath: currentPath,
        params,
        query: currentQuery,
        navigate,
      }}
    >
      {Page ? <Page /> : <DefaultComponent />}
    </RouterContext.Provider>
  );
}

Router.displayName = 'Router';
