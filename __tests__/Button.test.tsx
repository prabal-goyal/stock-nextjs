import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button, { ButtonProps } from '@/src/pages/components/Button';

jest.mock('next/link', () => {
    const MockLink = ({ children, href }: ButtonProps) => <a href={href}>{children}</a>;
    MockLink.displayName = 'MockLink';
    return MockLink;
});

describe('Button component', () => {
    it('renders children correctly', () => {
        render(<Button href="/test">Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('renders with correct href', () => {
        render(<Button href="/test">Click Me</Button>);
        const linkElement = screen.getByText('Click Me');
        expect(linkElement.closest('a')).toHaveAttribute('href', '/test');
    });

    it('uses default class name when no class is provided', () => {
        render(<Button href="/test">Click Me</Button>);
        const linkElement = screen.getByText('Click Me');
        expect(linkElement).not.toHaveClass();
    });
});
