import { render, screen } from '@testing-library/react';
import SocialLogin from '@/components/SocialLogin';

describe('SocialLogin Component', () => {
  it('should render the component correctly', () => {
    render(<SocialLogin />);
    expect(screen.getByText('Secure SSO login')).toBeInTheDocument();
  });

  it('should display the SSO login button', () => {
    render(<SocialLogin />);
    const button = screen.getByRole('button', { name: /Continue with SSO/i });
    expect(button).toBeInTheDocument();
  });

  it('should have the button with outline variant', () => {
    render(<SocialLogin />);
    const button = screen.getByRole('button', { name: /Continue with SSO/i });
    expect(button).toHaveClass('border');
  });

  it('should display the lock icon', () => {
    render(<SocialLogin />);
    const icon = screen.getByRole('button', { name: /Continue with SSO/i }).querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
