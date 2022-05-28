import React, { FunctionComponent, HTMLAttributes } from 'react';

// Components

// Interfaces

// Stylesheet
import './Plate.scss'

export interface PlateProps extends HTMLAttributes<HTMLDivElement> {

}

const Plate: FunctionComponent<PlateProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <div {...otherProps} className={`plate ${className || ''}`} />
    );
};

export default Plate;