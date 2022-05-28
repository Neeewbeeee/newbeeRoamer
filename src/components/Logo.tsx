import React, { FunctionComponent } from 'react';

// Components

// Interfaces

// Stylesheet
import './Logo.scss'

export interface LogoProps extends React.HTMLAttributes<HTMLImageElement> {
    className?: string;
}

const Logo: FunctionComponent<LogoProps> = (props) => {

    return (
        <img src={require('../assets/logo.svg')} {...props} className={`logo ${props.className || ''}`}></img>
    );
};

export default Logo;