import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from '@/src/pages/components/Container';

describe('Container component', () => {
    it('renders children correctly', () => {
        render(
            <Container>
                <p>Test Content</p>
            </Container>
        );
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies default styles correctly', () => {
        const { container } = render(
            <Container>
                <p>Default Styles Test</p>
            </Container>
        );
        const containerDiv = container.firstChild;
        expect(containerDiv).toHaveClass('container'); // Ensure it has the default class
    });

    it('appends additional class names when provided', () => {
        const additionalClass = 'extra-class';
        const { container } = render(
            <Container newClassNames={additionalClass}>
                <p>Additional Classes Test</p>
            </Container>
        );
        const containerDiv = container.firstChild;
        expect(containerDiv).toHaveClass('container'); // Still has the base class
        expect(containerDiv).toHaveClass(additionalClass); // Also has the new class
    });

    it('renders correctly when no additional class names are provided', () => {
        const { container } = render(
            <Container>
                <p>No Additional Classes</p>
            </Container>
        );
        const containerDiv = container.firstChild;
        expect(containerDiv).not.toHaveClass('extra-class'); // Does not have any extra classes
    });
});
