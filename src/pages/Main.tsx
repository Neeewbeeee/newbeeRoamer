import React, { useState, FunctionComponent, useCallback, useRef, useEffect } from 'react';
import Button from '../components/Button';
import { IconEarth } from '../components/Icons';
import Input from '../components/Input';
import MyLink from '../components/MyLink';
import Navbar from '../components/Navbar';
import axios from 'axios';

import { useNavigate } from 'react-router';

// Components

// Interfaces

// Stylesheet
import './Main.scss';
import { NumberKeyframeTrack } from 'three';

export interface MainProps {

}

const Main: FunctionComponent<MainProps> = (props) => {
    const userRef = useRef<{ userName: string, password: string }>({ userName: '', password: '' });
    const loginBtnRef = useRef<HTMLButtonElement>();
    const [loginErr, setLoginErr] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleLogin = useCallback(() => {
        const { userName, password } = userRef.current;
        axios.post("http://shepsword.xyz:9090/users/login", {
            userName, password
        }).then((res) => {
            if (res.data.code === '-1') {
                setLoginErr(true);
            } else if (res.data.code === '0') {
                localStorage.setItem('credentials', JSON.stringify({ userName, password }));
                navigate('/apps');
            }
        })

    }, [navigate]);

    useEffect(() => {
        const handlePressEnter = (ev: KeyboardEvent) => {
            if (ev.key === 'Enter') {
                ev.preventDefault();
                loginBtnRef.current.click();
            }
        };
        document.addEventListener('keypress', handlePressEnter);
        return () => { document.removeEventListener('keypress', handlePressEnter) };
    })

    return (
        <div className='main'>
            <Navbar />
            <div className='main--content flex-start'>
                <div className='main--illustration'>
                    <img src={require('../assets/main-page.png')}></img>
                </div>
                <div className='main--login flex-col-start'>
                    <IconEarth className='main--earth' />
                    <div className='main--login-title'>登录 xRouter 管理平台</div>
                    <Input className='main--username' placeholder='用户名' onChange={(ev) => userRef.current.userName = ev.currentTarget.value} />
                    <Input type='password' className='main--password' placeholder='密码' onChange={(ev) => userRef.current.password = ev.currentTarget.value} />
                    <Button innerRef={loginBtnRef} className='main--login-btn' onClick={handleLogin}>登录</Button>
                    <div style={{
                        display: loginErr ? "block" : 'none',
                        color: "var(--clr-fn-error)",
                        marginBottom: '10rem',
                    }}>用户名或密码错误</div>
                    <MyLink to='/' className='main--link'>忘记密码</MyLink>
                    <MyLink to='/signup' className='main--link'>注册账号</MyLink>
                </div>
            </div>
        </div >
    );
};

export default Main;