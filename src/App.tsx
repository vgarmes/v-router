import { Suspense, lazy } from 'react';
import './App.css';
import Router from './Router';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import Page404 from './pages/404';
import Route from './Route';

const AboutPage = lazy(() => import('./pages/About.tsx'));

const routes = [
  {
    path: '/search/:query',
    Component: SearchPage,
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
