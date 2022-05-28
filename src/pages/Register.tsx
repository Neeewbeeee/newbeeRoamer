
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import "./common.scss";
import "./Register.scss";

class Register extends Component {
    render() {
        return (
            <div className="register flex-col">
                <div className="main1 flex-col justify-between">
                    <Navbar />
                    <div className="section3 flex-col">
                        <div className="group4 flex-col">
                            <div className="layer1 flex-col">
                                <span className="word5">注册&nbsp;xRouter&nbsp;管理平台账号</span>
                                <span style={{
                                    color: "var(--clr-fn-warn)",
                                    fontSize: "15rem",
                                    marginLeft: "4rem",
                                }}>注册暂未开放噢，请联系管理员获取测试账号</span>
                                <div className="outer1 flex-row">
                                    <span className="word6">用户名</span>
                                    <span className="info2">*</span>
                                </div>
                                <div className="outer2 flex-col">
                                    <span className="word7">请输入6～12个英文大小写或数字字符</span>
                                </div>
                                <div className="outer3 flex-row justify-between">
                                    <span className="word8">密码</span>
                                    <span className="txt3">*</span>
                                </div>
                                <div className="outer4 flex-col">
                                    <span className="word9">请输入8～16个英文大小写和数字混合字符</span>
                                </div>
                                <div className="outer5 flex-row justify-between">
                                    <span className="word10">确认密码</span>
                                    <span className="word11">*</span>
                                </div>
                                <div className="outer6 flex-col">
                                    <span className="word12">请再次输入密码</span>
                                </div>
                                <div className="outer7 flex-row justify-between">
                                    <span className="word13">手机号码</span>
                                    <span className="word14">*</span>
                                </div>
                                <div className="outer8 flex-row justify-between">
                                    <div className="mod1 flex-col">
                                        <div className="mod2 flex-row">
                                            <span className="word15">+</span>
                                            <span className="txt4">86</span>
                                            <div className="layer2 flex-col" />
                                        </div>
                                    </div>
                                    <div className="mod3 flex-col">
                                        <span className="word16">请输入手机号码</span>
                                    </div>
                                    <span className="txt5">发送验证码</span>
                                </div>
                                <span className="info3">电子邮箱</span>
                                <div className="outer9 flex-col">
                                    <span className="info4">如果您期望接收我们产品的最新消息，请填写此字段</span>
                                </div>
                                <div className="outer10 flex-row justify-between">
                                    <span className="info5">用户主体</span>
                                    <span className="txt6">*</span>
                                </div>
                                <div className="outer11 flex-row justify-between">
                                    <div className="block1 flex-col">
                                        <span className="info6">公司</span>
                                    </div>
                                    <div className="block2 flex-col">
                                        <span className="info7">社会组织</span>
                                    </div>
                                    <div className="block3 flex-col">
                                        <span className="txt7">个人</span>
                                    </div>
                                </div>
                                <span className="word17">您期望使用的功能</span>
                                <div className="outer12 flex-col" />
                                <div className="outer13 flex-col">
                                    <span className="info8">提交注册信息</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;
