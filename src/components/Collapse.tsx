import React, { useState, FunctionComponent, HTMLAttributes, useMemo, useCallback } from 'react';

// Components

// Interfaces

// Stylesheet
import './Collapse.scss'

interface CollapseChildElementProps {
    slot: 'header' | 'content';
}
interface CollapseChildElement extends React.ReactElement<CollapseChildElementProps> { }

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
    showButton?: boolean;
    children?: CollapseChildElement | CollapseChildElement[],
    defaultExpanded?: boolean;
}

const Collapse: FunctionComponent<CollapseProps> = (props) => {

    const { showButton, className, children, defaultExpanded, ...otherProps } = props;

    const [expanded, setExpanded] = useState<boolean>(defaultExpanded || true);

    const { headerElem, contentElem } = useMemo(() => {
        const arrayedChildren = Array.isArray(children) ? children : [children];
        const elems: { headerElem: CollapseChildElement, contentElem: CollapseChildElement } =
            { headerElem: null, contentElem: null };
        arrayedChildren.forEach((child) => {
            if (child.props.slot === 'header') elems.headerElem = child;
            else if (child.props.slot === 'content') elems.contentElem = child;
        });
        return elems;
    }, [children]);


    const handleClickHeader = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    return (
        <div className={`collapse ${className || ''}`} {...otherProps}>
            <div onClick={handleClickHeader} className={`collapse--header ${expanded ? 'collapse--header--expanded' : ''}`}>{headerElem}</div>
            <div className={`collapse--content ${expanded ? 'collapse--content--expanded' : ''}`}>{contentElem}</div>
        </div>
    );
};

export default Collapse;