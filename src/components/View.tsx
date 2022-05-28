import React, { useState, FunctionComponent, useEffect, HTMLAttributes } from 'react';
import { useRoamer } from '../hooks/useRoamer';
import Button from './Button';
import Input from './Input';

// Components

// Interfaces

// Stylesheet
import './View.scss'

export interface ViewProps extends HTMLAttributes<HTMLDivElement> {

}

const View: FunctionComponent<ViewProps> = (props) => {
    const { className, ...otherProps } = props;

    const { init } = useRoamer();
    useEffect(() => {
        init('three', 'cesium');
    });

    return (
        <div className={`view ${className || ''}`}>
            <div className='view--controls'>
                <Button className='view--button' id='btncallapp'>开始导航</Button>
                <Input className='view--input' id='tipinput'></Input>
                <Input className='view--input' id='tipinput2'></Input>
            </div>
            <div id='cesium'></div>
            <canvas id='three'></canvas>
        </div>
    );
};

export default View;