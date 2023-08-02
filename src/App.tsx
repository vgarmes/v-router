import { Suspense, lazy } from 'react';
import { Router, Route } from './';
import HomePage from './pages/Home';
import Page404 from './pages/404';
import AboutPage from './pages/About';
import UserPage from './pages/User';
const LazyPage = lazy(() => import('./pages/Lazy'));

const routes = [
  {
    path: '/user/:id',
    element: <UserPage />,
  },
  { path: '/lazy', element: <LazyPage /> },
];

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={routes} defaultElement={<Page404 />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
