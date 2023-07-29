import { Link, useRouter } from '..';

function UserPage() {
  const { pathname, asPath, params, query } = useRouter();

  return (
    <div>
      <h1>This is a page with dynamic segments</h1>
      <p>{`Id: ${params.id}`}</p>
      <p>{`Pathname: ${pathname}`}</p>
      <p>{`asPath: ${asPath}`}</p>
      <p>{`Query: ${JSON.stringify(query)}`}</p>
      <Link to={{ pathname: asPath, query: { search: 'word' } }}>
        Add query parameters
      </Link>
    </div>
  );
}

export default UserPage;
