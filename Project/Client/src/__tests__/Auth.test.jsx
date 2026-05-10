import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Auth from '../pages/Auth';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Auth Component', () => {
  it('renders login form by default', () => {
    renderWithRouter(<Auth />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('toggles to registration form', () => {
    renderWithRouter(<Auth />);
    const toggleButton = screen.getByRole('button', { name: "Don't have an account? Sign Up" });
    fireEvent.click(toggleButton);

    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });
});
