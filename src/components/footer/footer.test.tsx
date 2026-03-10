import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './footer';

describe('Footer', () => {
  it('renders the footer with correct copyright year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrightElement = screen.getByText(
      new RegExp(`© ${currentYear} Your name here. All rights reserved.`),
    );

    expect(copyrightElement).toBeInTheDocument();
  });

  it('renders the TanStack Start credit', () => {
    render(<Footer />);

    const creditElement = screen.getByText('Built with TanStack Start');
    expect(creditElement).toBeInTheDocument();
  });

  it('renders social media links with correct attributes', () => {
    render(<Footer />);

    const xLink = screen.getByRole('link', { name: 'Follow TanStack on X' });
    expect(xLink).toBeInTheDocument();
    expect(xLink).toHaveAttribute('href', 'https://x.com/tan_stack');
    expect(xLink).toHaveAttribute('target', '_blank');
    expect(xLink).toHaveAttribute('rel', 'noreferrer');

    const githubLink = screen.getByRole('link', {
      name: 'Go to TanStack GitHub',
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/TanStack');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders SVG icons for social media', () => {
    render(<Footer />);

    // Find SVG elements by their parent links
    const xLink = screen.getByRole('link', { name: 'Follow TanStack on X' });
    const xIcon = xLink.querySelector('svg');
    expect(xIcon).toBeInTheDocument();
    expect(xIcon).toHaveAttribute('viewBox', '0 0 16 16');

    const githubLink = screen.getByRole('link', {
      name: 'Go to TanStack GitHub',
    });
    const githubIcon = githubLink.querySelector('svg');
    expect(githubIcon).toBeInTheDocument();
    expect(githubIcon).toHaveAttribute('viewBox', '0 0 16 16');
  });

  it('renders the footer with correct structure', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();

    const footerContent = screen
      .getByRole('contentinfo')
      .querySelector('.page-wrap');
    expect(footerContent).toBeInTheDocument();

    const socialLinks = screen.getByRole('contentinfo').querySelector('.mt-4');
    expect(socialLinks).toBeInTheDocument();
  });
});
