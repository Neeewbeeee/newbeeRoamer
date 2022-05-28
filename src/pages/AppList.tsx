import React, { useState, FunctionComponent, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Collapse from '../components/Collapse';
import Heading from '../components/Heading';
import { IconDropdown } from '../components/Icons';
import { appsMock } from '../mocks/appMocks';

// Components

// Interfaces

// Stylesheet
import './AppList.scss'

interface AppListCollapseHeaderProps {
    children?: React.ReactNode;
    slot: 'header';
    className?: string;
}

const AppListCollapseHeader: FunctionComponent<AppListCollapseHeaderProps> = ({ className, children }) => {
    return (
        <div className={className}>
            <IconDropdown />
            <span>{children}</span>
            <div />
        </div>
    )
}

interface AppListAppCardProps {
    imgSrc: string;
    appName: string;
    views: number;
    description: string;
    className?: string;
    link?: string;
}

const AppListAppCard: FunctionComponent<AppListAppCardProps> = (props) => {
    const { imgSrc, appName, views, description, link, className } = props;

    return (
        <Link className={className} to={link}>
            <img className='app-list--card-image' src={imgSrc} alt={description} />
            <div className='app-list--card-heading flex-start'>
                <div className='app-list--card-app-name'>{appName}</div>
                <div className='flex-space'></div>
                <div className='app-list--card-views'>访问量{views}</div>
            </div>
            <div className='app-list--card-descrip'>{description}</div>
        </Link>
    )
}

export interface AppListProps {

}

const collapses: { status: 'active' | 'inactive' | 'ended', displayName: string }[] = [
    { status: 'active', displayName: '活跃中' },
    { status: 'inactive', displayName: '未开放' },
    { status: 'ended', displayName: '已结束' }
]

const AppList: FunctionComponent<AppListProps> = (props) => {

    return (
        <div className='app-list'>
            <div className='app-list--heading flex-center'>
                <Heading className='app-list--title'>应用实例列表</Heading>
                <div className='flex-space' />
                <Button className='app-list--create-btn'>创建实例</Button>
            </div>
            {
                collapses.map((eachCollapse) => (
                    <Collapse key={eachCollapse.status}>
                        <AppListCollapseHeader className='app-list--collapse-header flex-start' slot='header'>{eachCollapse.displayName}</AppListCollapseHeader>
                        <div className='app-list--collapse-content' slot='content'>{
                            (function () {
                                const filteredAppElems = appsMock.filter((elem) => elem.status === eachCollapse.status).map((elem) => (
                                    <AppListAppCard className='app-list--app-card' imgSrc={elem.imgUrl} views={elem.views} link={`/apps/${elem.id}`}
                                        key={elem.id} appName={elem.name} description={elem.descrip} />
                                ));
                                return filteredAppElems.length === 0 ? `暂时没有${eachCollapse.displayName}的应用实例哦～` : filteredAppElems;
                            })()
                        }</div>
                    </Collapse>
                ))
            }
        </div>
    );
};



export default AppList;