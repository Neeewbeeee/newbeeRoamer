"use strict";

import React, { Component } from "react";

import "./common.scss";
import "./AppManagement.scss";
import { Link, useParams } from "react-router-dom";

const AppManagement: React.FC = () => {

    const params = useParams();
    const appId = params.appId;

    return (
        <div className="app-man flex-col">
            <div className="outer1 flex-col justify-between">
                <div className="box1 flex-col">
                    <div className="block1 flex-row">
                        <div className="layer1 flex-col" />
                        <span className="txt1">xRouter</span>
                        <div className="layer2 flex-col" />
                        <div className="layer3 flex-col" />
                        <div className="layer4 flex-col" />
                        <span className="word1">shepard</span>
                    </div>
                </div>
                <div className="box2 flex-col" />
            </div>
            <div className="outer2 flex-col">
                <div className="box3 flex-col">
                    <span className="info1">应用实例</span>
                    <div className="layer5 flex-row justify-between">
                        <img
                            className="pic1"
                            src={
                                "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng21fbd8bc8aaf074a3af36878b82af3b7736e1ed84da1ef16fc7df4d3f474e76c"
                            }
                        />
                        <div className="layer6 flex-col justify-between">
                            <div className="TextGroup1 flex-col">
                                <div className="wrap1 flex-col justify-between">
                                    <span className="word2">天鹅路197号A座导航</span>
                                    <span className="word3">为公司临时会议参会人员提供室内外导航服务</span>
                                </div>
                            </div>
                            <div className="TextGroup2 flex-col">
                                <div className="section1 flex-col justify-between">
                                    <span className="word4">发布于&nbsp;2022-04-02</span>
                                    <span className="txt2">访问量&nbsp;66</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="info2">编辑应用</span>
                    <div className="layer7 flex-row">
                        <div className="mod1 flex-col" />
                        <Link to={`/model-editor/${appId}`} className="word5">模型管理器</Link>
                        <div className="mod2 flex-col" />
                        <Link to={`/geo-nav-editor/${appId}`} className="txt3">地理导航路径编辑器</Link>
                        <div className="mod3 flex-col" />
                        <Link to={`/indoor-nav-editor/${appId}`} className="word6">室内导航路径编辑器</Link>
                    </div>
                    <div className="layer8 flex-row">
                        <div className="TextGroup3 flex-col">
                            <div className="box4 flex-col justify-between">
                                <span className="info3">发布应用</span>
                                <span className="info4">应用实例已发布，用户可以通过链接或二维码访问实例</span>
                            </div>
                        </div>
                        <div className="section2 flex-col">
                            <div className="section3 flex-col" />
                        </div>
                        <span className="word7">暂停分享</span>
                    </div>
                    <span className="info5">分享链接</span>
                    <div className="layer9 flex-row">
                        <div className="bd1 flex-col">
                            <span className="word8">https://share.xRouter.com/19m5n764g1bdy630f=fn</span>
                        </div>
                        <div className="bd2 flex-col">
                            <div className="group1 flex-col" />
                        </div>
                        <span className="info6">复制链接</span>
                        <div className="bd3 flex-col">
                            <div className="bd4 flex-col" />
                        </div>
                        <span className="word9">重新生成</span>
                    </div>
                    <div className="layer10 flex-col">
                        <div className="wrap2 flex-col justify-between">
                            <div className="TextGroup4 flex-col">
                                <div className="layer11 flex-row">
                                    <span className="info7">天鹅路197号A座导航</span>
                                    <span className="word10">xRouter</span>
                                </div>
                            </div>
                            <img
                                className="img1"
                                src={
                                    "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng554fa9ce43eaa3b3844edfdaa50d05ba8b91b5818f1d450c0b11fe24bf4f8778"
                                }
                            />
                        </div>
                    </div>
                    <div className="layer12 flex-row justify-between">
                        <div className="mod4 flex-col" />
                        <span className="word11">保存二维码图片</span>
                    </div>
                </div>
                <Link to={`/model-editor/${appId}`} className="box5 flex-col" />
                <Link to={`/geo-nav-editor/${appId}`} className="box6 flex-col" />
                <Link to={`/indoor-nav-editor/${appId}`} className="box7 flex-col" />
                <div className="box8 flex-col" />
            </div>
        </div>
    );
}
export default AppManagement;
