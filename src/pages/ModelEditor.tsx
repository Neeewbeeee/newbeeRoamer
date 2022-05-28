
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./common.scss";
import "./ModelEditor.scss";

class ModelEditor extends Component {
    render() {
        return (
            <div className="model-editor flex-col">
                <div className="mod1 flex-col justify-between">
                    <div className="block1 flex-col">
                        <div className="box1 flex-row">
                            <div className="outer1 flex-col" />
                            <div className="outer2 flex-col" />
                            <Link to='/apps' className="word1">xRouter</Link>
                            <span className="word2">天鹅路197号A座导航</span>
                            <div className="outer3 flex-col" />
                            <span className="txt1">模型管理器</span>
                            <div className="outer4 flex-col" />
                            <div className="outer5 flex-col" />
                            <div className="outer6 flex-col" />
                            <span className="word3">shepard</span>
                        </div>
                    </div>
                    <div className="block2 flex-row justify-between">
                        <img
                            className="pic1"
                            src={
                                "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng5e127bfd702cca83c95d0f1c6339e8d2a64b8213fd8d0028c8393fbb3a2f4502"
                            }
                        />
                        <div className="layer1 flex-col">
                            <div className="layer2 flex-col justify-between">
                                <div className="mod2 flex-col">
                                    <div className="outer7 flex-row">
                                        <div className="outer8 flex-col" />
                                        <span className="txt2">模型</span>
                                        <span className="word4">#3&nbsp;乐天大厦</span>
                                        <div className="outer9 flex-col" />
                                    </div>
                                </div>
                                <div className="mod3 flex-col">
                                    <div className="bd1 flex-row">
                                        <div className="mod4 flex-col" />
                                        <span className="word5">位置、尺寸和姿态</span>
                                        <div className="mod5 flex-col" />
                                    </div>
                                </div>
                                <div className="mod6 flex-col">
                                    <div className="section1 flex-row justify-between">
                                        <div className="ImageText1 flex-col">
                                            <div className="layer3 flex-row justify-between">
                                                <div className="block3 flex-col" />
                                                <div className="TextGroup1 flex-col">
                                                    <span className="word6">光照</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bd2 flex-col" />
                                    </div>
                                </div>
                                <div className="mod7 flex-col">
                                    <div className="outer10 flex-row justify-between">
                                        <div className="ImageText2 flex-col">
                                            <div className="mod8 flex-row justify-between">
                                                <div className="main1 flex-col" />
                                                <div className="TextGroup2 flex-col">
                                                    <span className="info1">渲染</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group1 flex-col" />
                                    </div>
                                </div>
                                <div className="mod9 flex-col">
                                    <div className="group2 flex-row justify-between">
                                        <div className="ImageText3 flex-col">
                                            <div className="bd3 flex-row justify-between">
                                                <div className="box2 flex-col" />
                                                <div className="TextGroup3 flex-col">
                                                    <span className="word7">特殊效果</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrap1 flex-col" />
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
export default ModelEditor;
