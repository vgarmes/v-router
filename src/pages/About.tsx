import { Link } from '../';

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <img src="" alt="" />
      <p>
        This is a showcase for a React Router clone!{' '}
        <a href="https://github.com/vgarmes/v-router">See source code</a>
      </p>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default AboutPage;
