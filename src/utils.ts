import { EVENTS } from './constants';
import { compile } from 'path-to-regexp';

export const getCurrentPath = () => window.location.pathname;

export const dispatchPushStateEvent = (href: string) => {
  window.history.pushState({}, '', href);
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
};

export const getQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const query = {} as Record<string, string | string[]>;
  for (const [key, value] of searchParams.entries()) {
    if (!query[key]) {
      query[key] = value;
    } else if (typeof query[key] === 'string') {
      query[key] = [query[key] as string, value];
    } else {
      query[key] = [...query[key], value];
    }
  }
  return query;
};

const compilePathWithSegments = (
  pathname: string,
  segments: Record<string, string>
) => {
  const toPath = compile(pathname, { encode: encodeURIComponent });
  return toPath(segments);
};

export type PathObject = {
  pathname: string;
  pathSegments?: Record<string, string>;
  query?: Record<string, string | string[]>;
};

export function getRelativeHref(
  url: string | PathObject,
  basename: string = ''
) {
  if (typeof url === 'string') {
    return basename + url;
  }
  if (!url.pathname) {
    return '';
  }

  let compiledPathname = basename;
  if (url.pathSegments) {
    compiledPathname += compilePathWithSegments(url.pathname, url.pathSegments);
  } else {
    compiledPathname += url.pathname;
  }

  const searchParams = new URLSearchParams();
  if (url.query) {
    Object.entries(url.query).forEach(([key, value]) => {
      if (typeof value === 'string') {
        searchParams.append(key, value);
      } else {
        value.forEach((val) => searchParams.append(key, val));
      }
    });
  }
  return searchParams.toString()
    ? `${compiledPathname}?${searchParams}`
    : compiledPathname;
}
