import './App.css';
import Router from './Router';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import SearchPage from './pages/Search';
import Page404 from './pages/404';
import Route from './Route';

const routes = [
  {
    path: '/search/:query',
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Router routes={routes} defaultComponent={Page404}>
        <Route path="/" Component={HomePage} />
        <Route path="/about" Component={AboutPage} />
      </Router>
    </main>
  );
}

export default App;
