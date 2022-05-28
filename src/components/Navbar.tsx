import React, { useState, FunctionComponent } from 'react';
import Logo from './Logo';
import XRouter from './XRouter';
import { IconGithub } from './Icons';

// Components

// Interfaces

// Stylesheet
import './Navbar.scss'
import { Link } from 'react-router-dom';

export interface NavbarProps {

}

const navLinks: { name: string, link: string }[] = [
    { name: '首页', link: '/' },
    { name: '接入', link: '/' },
    { name: '应用案例', link: '/' },
    { name: '技术支持', link: '/' },
]

const Navbar: FunctionComponent<NavbarProps> = () => {

    return (
        <div className='navbar flex-center'>
            <Logo className='navbar--logo' />
            <XRouter />
            <div className='flex-space'></div>
            <>{
                navLinks.map((elem) => (
                    <Link key={elem.name} className='navbar--item' to={elem.link}>{elem.name}</Link>
                ))
            }</>
            <div className='navbar--github flex-start'>
                <IconGithub />
                <div>{2085}</div>
            </div>
        </div >
    );
};

export default Navbar;