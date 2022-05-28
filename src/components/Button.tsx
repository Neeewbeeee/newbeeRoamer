import React, { useState, FunctionComponent, HTMLAttributes, MutableRefObject } from 'react';

// Components

// Interfaces

// Stylesheet
import './Button.scss'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    innerRef?: MutableRefObject<HTMLButtonElement>;
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    const { className, innerRef, children, ...otherProps } = props;

    return (
        <button ref={innerRef} className={`button ${className || ''}`} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;