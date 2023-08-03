import { Link } from '../Link';

function LazyPage() {
  return (
    <div>
      <h1>I'm a lazy loaded page</h1>
      <p>
        You might have noticed a momentary blink since this page is lazy loaded
        and it requested the necessary JavaScript from the server
      </p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default LazyPage;
