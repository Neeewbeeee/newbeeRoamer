import React, { useState, FunctionComponent, useMemo } from 'react';
import Logo from './Logo';
import XRouter from './XRouter';
import { IconAlarm, IconFile, IconGithub, IconUser } from './Icons';

// Components

// Interfaces

// Stylesheet
import './NavbarApp.scss'

export interface NavbarAppProps {

}

const NavbarApp: FunctionComponent<NavbarAppProps> = () => {

    const statusBtns = useMemo(() => {
        return [
            <IconFile />,
            <IconAlarm />,
            <IconUser />
        ].map((icon, index) => (
            <div className='navbar-app--status-btn' key={index}>{icon}</div>
        ));
    }, []);

    return (
        <div className='navbar-app flex-center'>
            <Logo className='navbara-app--logo' />
            <XRouter />
            <div className='flex-space'></div>
            {statusBtns}
            <div className='navbar-app--username'>shepard</div>
        </div >
    );
};

export default NavbarApp;