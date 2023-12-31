import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Router, Route, Link } from './';
import { getCurrentPath } from './utils';

vi.mock('./utils', async () => {
  const mod = await vi.importActual<typeof import('./utils')>('./utils');
  return {
    ...mod,
    getCurrentPath: vi.fn(),
  };
});

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
    render(<Router defaultElement={<h1>404</h1>} />);
    expect(screen.getByText('404')).toBeTruthy();
  });

  it('should render the component of the first route that matches', () => {
    (getCurrentPath as Mock).mockReturnValue('/about');
    render(
      <Router defaultElement={<h1>404</h1>}>
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/" element={<h1>Home</h1>} />
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
      <Router defaultElement={<h1>404</h1>}>
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/" element={<Home />} />
      </Router>
    );

    const link = screen.getByTestId('about-link');
    fireEvent.click(link);
    expect(screen.getByText('About')).toBeTruthy();
  });
});
