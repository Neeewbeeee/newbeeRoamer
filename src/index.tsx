import React from "react";
import { render } from "react-dom";

import App from './App';
import './index.scss';

render(<App />, document.getElementById('root'));

// 自适应宽度缩放
let resizeTimeout: any = null;
window.addEventListener('resize', (ev) => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        document.documentElement.style.fontSize = `${1 / 1440 * window.innerWidth}px`;
        console.log('resized');
    }, 100);
});