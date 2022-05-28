

import React, { Component } from "react";
import { Link } from "react-router-dom";
import View from "../components/View";

import "./common.scss";
import "./IndoorNavEditor.scss";

class IndoorNavEditor extends Component {
    render() {
        return (
            <div className="indoor-nav flex-col">
                <div className="main1 flex-col justify-between">
                    <div className="block1 flex-col">
                        <div className="box1 flex-row">
                            <div className="group1 flex-col" />
                            <div className="group2 flex-col" />
                            <Link to='/apps' className="txt1">xRouter</Link>
                            <span className="word1">天鹅路197号A座导航</span>
                            <div className="group3 flex-col" />
                            <span className="txt2">室内导航路径编辑器</span>
                            <div className="group4 flex-col" />
                            <div className="group5 flex-col" />
                            <div className="group6 flex-col" />
                            <span className="info1">shepard</span>
                        </div>
                    </div>
                    <div className="block2 flex-row justify-between">
                        <div className="layer1 flex-col">
                            <View></View>
                        </div>
                        <div className="layer2 flex-col">
                            <div className="group10 flex-col justify-between">
                                <div className="main5 flex-col">
                                    <div className="bd1 flex-row">
                                        <div className="section13 flex-col" />
                                        <span className="word6">模型</span>
                                        <div className="section14 flex-col" />
                                    </div>
                                </div>
                                <div className="main6 flex-col">
                                    <div className="bd2 flex-row">
                                        <div className="box4 flex-col" />
                                        <span className="info3">路径</span>
                                        <div className="box5 flex-col" />
                                    </div>
                                </div>
                                <div className="main7 flex-col">
                                    <div className="group11 flex-row justify-between">
                                        <div className="ImageText1 flex-col">
                                            <div className="outer5 flex-row justify-between">
                                                <div className="outer6 flex-col" />
                                                <div className="TextGroup1 flex-col">
                                                    <span className="info4">HUD</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mod2 flex-col" />
                                    </div>
                                </div>
                                <div className="main8 flex-col">
                                    <div className="mod3 flex-row justify-between">
                                        <div className="ImageText2 flex-col">
                                            <div className="block3 flex-row justify-between">
                                                <div className="section15 flex-col" />
                                                <div className="TextGroup2 flex-col">
                                                    <span className="word7">触发器</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrap3 flex-col" />
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
export default IndoorNavEditor;
