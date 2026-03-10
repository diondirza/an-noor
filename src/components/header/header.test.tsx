import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
  useRouter: vi.fn(),
}));

import Header from './header';

describe('Header', () => {
  it('renders the header with correct title', () => {
    // Render the header component directly without router context
    const { container } = render(<Header />);

    // Check that the title is rendered
    const titleElement = container.querySelector('h2');
    expect(titleElement).toBeInTheDocument();

    // Check that the link with the title is present
    const linkElement = container.querySelector('a');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement?.textContent).toContain('An-Noor');
  });

  it('renders the theme toggle component', () => {
    const { container } = render(<Header />);

    // Check that the theme toggle button is present
    const themeToggle = container.querySelector('button');
    expect(themeToggle).toBeInTheDocument();
  });

  it('renders the header with correct structure', () => {
    const { container } = render(<Header />);

    // Check that the header element is present
    const headerElement = container.querySelector('header');
    expect(headerElement).toBeInTheDocument();

    // Check that the nav element is present
    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();

    // Check that the page-wrap class is present
    const pageWrap = container.querySelector('.page-wrap');
    expect(pageWrap).toBeInTheDocument();
  });

  it('renders the header with correct styling classes', () => {
    const { container } = render(<Header />);

    // Check that the header element has the correct classes
    const headerElement = container.querySelector('header');
    expect(headerElement).toHaveClass('sticky');
    expect(headerElement).toHaveClass('top-0');
    expect(headerElement).toHaveClass('z-50');
    expect(headerElement).toHaveClass('border-(--line)');
    expect(headerElement).toHaveClass('border-b');
    expect(headerElement).toHaveClass('bg-(--header-bg)');
    expect(headerElement).toHaveClass('px-4');
    expect(headerElement).toHaveClass('backdrop-blur-lg');
  });
});
