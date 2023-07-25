import './App.css';
import Router from './Router';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import SearchPage from './pages/Search';
import Page404 from './pages/404';

const routes = [
  {
    path: '/',
    Component: HomePage,
  },
  { path: '/about', Component: AboutPage },
  {
    path: '/search/:query',
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Router routes={routes} defaultComponent={Page404} />
    </main>
  );
}

export default App;
