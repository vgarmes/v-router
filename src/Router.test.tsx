import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Router from './Router';
import { getCurrentPath } from './utils';
import Route from './Route';
import Link from './Link';

vi.mock('./utils.ts', () => ({
  getCurrentPath: vi.fn(),
}));

describe('Router', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it('should render without issues', () => {
    render(<Router />);
    expect(true).toBeTruthy();
  });

  it('should render 404 if no routes match', () => {
    render(<Router defaultComponent={() => <h1>404</h1>} />);
    expect(screen.getByText('404')).toBeTruthy();
  });

  it('should render the component of the first route that matches', () => {
    (getCurrentPath as Mock).mockReturnValue('/about');
    render(
      <Router defaultComponent={() => <h1>404</h1>}>
        <Route path="/about" Component={() => <h1>About</h1>} />
        <Route path="/" Component={() => <h1>Home</h1>} />
      </Router>
    );
    expect(screen.getByText('About')).toBeTruthy();
  });

  it('should navigate using Link component', () => {
    (getCurrentPath as Mock).mockReturnValueOnce('/');

    const Home = () => (
      <>
        <h1>Home</h1>
        <Link data-testid="about-link" to="/about">
          Go to about
        </Link>
      </>
    );

    render(
      <Router defaultComponent={() => <h1>404</h1>}>
        <Route path="/about" Component={() => <h1>About</h1>} />
        <Route path="/" Component={Home} />
      </Router>
    );

    const link = screen.getByTestId('about-link');
    fireEvent.click(link);
    expect(screen.getByText('About')).toBeTruthy();
  });
});
