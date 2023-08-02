import {
  useState,
  useEffect,
  Children,
  PropsWithChildren,
  ReactNode,
  useCallback,
} from 'react';
import { EVENTS } from './constants';
import { match } from 'path-to-regexp';
import { RouteProps } from './';
import {
  PathObject,
  dispatchPushStateEvent,
  getCurrentPath,
  getRelativeHref,
  getQueryParams,
} from './utils';
import { RouterContext } from './context';

interface Props {
  routes?: Array<RouteProps>;
  defaultElement?: ReactNode;
  basename?: string;
}

export function Router({
  children,
  routes = [],
  defaultElement = <h1>404</h1>,
  basename = '',
}: PropsWithChildren<Props>) {
  const [currentLocation, setCurrentLocation] = useState({
    path: getCurrentPath(),
    query: getQueryParams(),
  });

  const navigate = useCallback(
    (to: string | PathObject) => {
      const href = getRelativeHref(to, basename);
      dispatchPushStateEvent(href);
    },
    [basename]
  );

  useEffect(() => {
    const onLocationChange = () =>
      setCurrentLocation({
        path: getCurrentPath(),
        query: getQueryParams(),
      });
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let params: Record<string, string> = {};
  let pathname: string = '';
  // Routes from children <Route /> components
  const routesFromChildren =
    Children.map(children, (child) => {
      const { props, type } = child as JSX.Element;
      const { displayName } = type;
      const isRoute = displayName === 'Route';

      return isRoute ? (props as RouteProps) : null;
    })?.filter(Boolean) || [];

  const routesToUse = [...routes, ...routesFromChildren];

  const page = routesToUse.find(({ path }) => {
    const pathWithBase = basename + path;

    if (pathWithBase === currentLocation.path) {
      pathname = path;
      return true;
    }

    const matcherUrl = match(pathWithBase, { decode: decodeURIComponent });

    const matched = matcherUrl(currentLocation.path);
    if (!matched) return false;

    params = matched.params as Record<string, string>;
    pathname = path;
    return true;
  })?.element;

  return (
    <RouterContext.Provider
      value={{
        pathname,
        asPath: currentLocation.path,
        params,
        query: currentLocation.query,
        navigate,
        basename,
      }}
    >
      {page ? page : defaultElement}
    </RouterContext.Provider>
  );
}

Router.displayName = 'Router';
