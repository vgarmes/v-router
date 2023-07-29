import { Link } from '../';

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Example page for testing the router</p>
      <Link to="/about">Go to About page</Link>
      <Link to={{ pathname: '/user/:id', pathSegments: { id: '123' } }}>
        Go to User page with dynamic route
      </Link>
    </>
  );
}

export default HomePage;
