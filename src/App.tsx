import { Suspense, lazy } from 'react';
import { Router, Route } from './';
import HomePage from './pages/Home';
import Page404 from './pages/404';
import { base } from './app.config';

const UserPage = lazy(() => import('./pages/User'));
const AboutPage = lazy(() => import('./pages/About'));

const routes = [
  {
    path: '/user/:id',
    element: <UserPage />,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={routes} defaultElement={<Page404 />} basename={base}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
