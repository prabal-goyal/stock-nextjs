import React from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
    children: React.ReactNode;
    newClassNames?: string;
}

const Container: React.FC<ContainerProps> = ({ children, newClassNames }) => {
    return (
        <div
            className={`${styles.container} ${newClassNames ?? ''}`}
        >
            {children}
        </div>
    );
};

export default Container;
