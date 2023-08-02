import { FormEvent } from 'react';
import { Link, useRouter } from '../';

interface FormElements extends HTMLFormControlsCollection {
  search: HTMLInputElement;
}

interface FormWithControls extends HTMLFormElement {
  readonly elements: FormElements;
}

function HomePage() {
  const { pathname, query, navigate } = useRouter();

  const onSubmit = (e: FormEvent<FormWithControls>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const searchTerm = elements.search.value;
    searchTerm
      ? navigate({
          pathname,
          query: { search: elements.search.value },
        })
      : navigate(pathname);
  };

  return (
    <>
      <h1>Home</h1>
      <p>Example page for testing the router</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginBottom: 32,
        }}
      >
        <Link to="/about">Go to About page</Link>
        <Link to={{ pathname: '/user/:id', pathSegments: { id: '123' } }}>
          Go to User page with dynamic route (lazy loaded)
        </Link>
        <Link to="/lazy">Lazy loaded page</Link>
      </div>

      <form onSubmit={onSubmit}>
        <label htmlFor="search">
          Search (just for testing query parameters)
        </label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input style={{ margin: 0 }} type="text" id="search" />
          <button style={{ paddingLeft: 8 }} type="submit">
            Search
          </button>
        </div>
      </form>
      {query.search && <p>{`You searched for "${query.search}"`}</p>}
    </>
  );
}

export default HomePage;
