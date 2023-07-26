import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Router from './Router';
import { getCurrentPath } from './utils';
import Route from './Route';

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
});
