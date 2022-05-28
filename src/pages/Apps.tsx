import React, { useState, FunctionComponent, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import NavbarApp from '../components/NavbarApp';
import Plate from '../components/Plate';

// Components

// Interfaces

// Stylesheet
import './Apps.scss'

export interface AppsProps {

}

const Apps: FunctionComponent<AppsProps> = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('credentials') === null) navigate('/');
    })

    return (
        <div className='apps'>
            <img src={require('../assets/city-bg.svg')} className='apps--bg' />
            <NavbarApp />
            <Plate className='apps--content'>
                <Outlet />
            </Plate>
        </div>
    );
};

export default Apps;