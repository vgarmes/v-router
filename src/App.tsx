import { Suspense, lazy } from 'react';
import { Router, Route } from './';
import HomePage from './pages/Home';
import UserPage from './pages/User.tsx';
import Page404 from './pages/404';

const AboutPage = lazy(() => import('./pages/About.tsx'));

const routes = [
  {
    path: '/user/:id',
    Component: UserPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
