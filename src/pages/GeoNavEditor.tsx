"use strict";

import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./common.scss";
import "./GeoNavEditor.scss";


class GeoNavEditor extends Component {
    render() {
        return (
            <div className="geo-nav flex-col">
                <div className="group1 flex-col justify-between">
                    <div className="section1 flex-col">
                        <div className="mod1 flex-row">
                            <div className="group2 flex-col" />
                            <div className="group3 flex-col" />
                            <Link to='/apps' className="word1">xRouter</Link>
                            <span className="info1">天鹅路197号A座导航</span>
                            <div className="group4 flex-col" />
                            <span className="word2">地理导航路径编辑器</span>
                            <div className="group5 flex-col" />
                            <div className="group6 flex-col" />
                            <div className="group7 flex-col" />
                            <span className="txt1">shepard</span>
                        </div>
                    </div>
                    <div className="section2 flex-row justify-between">
                        <div className="box1 flex-col">
                            <div className="section3 flex-row justify-between">
                                <div className="bd1 flex-col">
                                    <div className="box2 flex-row justify-between">
                                        <span className="info2">终点名</span>
                                        <div className="mod2 flex-col">
                                            <span className="txt2">公司二号楼</span>
                                        </div>
                                    </div>
                                    <div className="box3 flex-row justify-between">
                                        <span className="info3">位置</span>
                                        <span className="word3">湖北省武汉市光谷路124号附近</span>
                                    </div>
                                    <div className="box4 flex-row justify-between">
                                        <span className="txt3">坐标</span>
                                        <span className="info4">110.113453°E&nbsp;30.212562°N</span>
                                    </div>
                                    <div className="box5 flex-row">
                                        <div className="layer1 flex-col" />
                                        <span className="word4">删除终点</span>
                                    </div>
                                </div>
                                <div className="bd2 flex-col">
                                    <div className="layer2 flex-row justify-between">
                                        <span className="txt4">武汉&nbsp;乐天大厦</span>
                                        <div className="group8 flex-col" />
                                    </div>
                                </div>
                            </div>
                            <div className="section4 flex-row">
                                <div className="main1 flex-col" />
                            </div>
                        </div>
                        <div className="box6 flex-col">
                            <div className="layer3 flex-col justify-between">
                                <div className="main2 flex-col">
                                    <div className="bd3 flex-row">
                                        <div className="layer4 flex-col" />
                                        <span className="word5">终点列表</span>
                                        <div className="layer5 flex-col" />
                                    </div>
                                </div>
                                <div className="main3 flex-col">
                                    <div className="mod3 flex-row">
                                        <div className="outer1 flex-col" />
                                        <span className="word6">模型关联</span>
                                        <div className="outer2 flex-col" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default GeoNavEditor;
