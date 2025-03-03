import React from 'react';
import Link from 'next/link';

export interface ButtonProps {
    children: React.ReactNode;
    newclassNames?: string;
    href: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    newclassNames = '',
    href,
}) => {
    return (
        <>
            {children &&
                <Link
                    className={`${newclassNames}`}
                    href={href ?? ''}
                >
                    {children}
                </Link>
            }
        </>

    );
};

export default Button;
