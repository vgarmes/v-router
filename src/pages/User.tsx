import { Link, useRouter } from '..';

function UserPage() {
  const { pathname, asPath, params } = useRouter();

  return (
    <div>
      <h1>This is a page with a dynamic segment (user id)</h1>
      <p>
        The id in the url is: <strong>{params.id}</strong>
      </p>
      <p>
        The pathname with segments: <strong>{pathname}</strong>
      </p>
      <p>
        The relative url with the dynamic values replaced:{' '}
        <strong>{asPath}</strong>
      </p>
      <Link to="/">Back home</Link>
    </div>
  );
}

export default UserPage;
