import React, { useState, FunctionComponent, HTMLAttributes } from 'react';

// Components

// Interfaces

// Stylesheet
import './Input.scss'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input: FunctionComponent<InputProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <input className={`input ${className || ''}`} {...otherProps} />
    );
};

export default Input;