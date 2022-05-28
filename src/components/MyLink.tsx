import React, { useState, FunctionComponent } from 'react';
import { Link, LinkProps } from 'react-router-dom';

// Components

// Interfaces

// Stylesheet
import './MyLink.scss'

export interface MyLinkProps extends LinkProps {
}

const MyLink: FunctionComponent<MyLinkProps> = (props) => {
    const { className, children, ...otherProps } = props;

    return (
        <Link className={`link ${className || ''}`} {...otherProps}>
            {children}
        </Link>
    );
};

export default MyLink;