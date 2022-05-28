import React, { useState, FunctionComponent, HTMLAttributes } from 'react';

// Components

// Interfaces

// Stylesheet
import './Heading.scss'

export interface HeadingProps extends HTMLAttributes<HTMLDivElement> {

}

const Heading: FunctionComponent<HeadingProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <div className={`heading ${className || ''}`} {...otherProps} />
    );
};

export default Heading;