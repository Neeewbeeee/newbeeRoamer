import React, { useState, FunctionComponent } from 'react';

// Components

// Interfaces

// Stylesheet
import './XRouter.scss'

export interface XRouterProps {

}

const XRouter: FunctionComponent<XRouterProps> = (props) => {

    return (
        <img className='xrouter' src={require('../assets/xRouter.svg')} />
    );
};

export default XRouter;