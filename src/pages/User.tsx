import { Link, useRouter } from '..';

function UserPage() {
  const { path, asPath, params, query } = useRouter();

  return (
    <div>
      <h1>This is a page with dynamic segments</h1>
      <p>{`Id: ${params.id}`}</p>
      <p>{`Path: ${path}`}</p>
      <p>{`asPath: ${asPath}`}</p>
      <p>{`Query: ${JSON.stringify(query)}`}</p>
      <Link to={`${asPath}?search=word`}>Add query parameters</Link>
    </div>
  );
}

export default UserPage;
