import { Link } from '../';

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Example page for testing the router</p>
      <Link to="/about">Go to About</Link>
    </>
  );
}

export default HomePage;
