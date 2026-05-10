import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders login screen by default when unauthenticated', () => {
    // Clear token if any
    localStorage.removeItem('token');
    
    render(<App />);
    
    // Auth component should be rendered
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });
});
