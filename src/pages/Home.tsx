import { Link } from '../router';

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
