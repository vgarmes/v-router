export const getCurrentPath = () => window.location.pathname;

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
