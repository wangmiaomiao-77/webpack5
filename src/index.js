
const add = (x,y)=>{
    return x+y;
}
console.log(add(2,3)); // 写错后启动项目想要在浏览器精准指向源文件

import png from '../resource/emptyBed.png'
const img = document.createElement('img');
img.src = png;
document.body.appendChild(img);


import svg from '../resource/feeEnter.svg'
const imgs = document.createElement('img');
imgs.src = svg;
document.body.appendChild(imgs);

import txt from '../resource/demo.txt'
const block = document.createElement('div');
block.style.cssText = 'width:200px; height:200px; background:aliceblue'
block.innerText = txt;
document.body.appendChild(block);


import './index.css'
document.body.classList.add('hello');

import './demo.less'


import helloName from './es6demo';
helloName();


import _ from 'lodash';

console.log(_.join(['hello','module','lodash!!'], ','));

import './async_module'

const button = document.createElement('button');
button.textContent = '点击计算';
button.addEventListener('click',()=>{
    // 预获取
    import(/* webpackChunkName: 'math', webpackPrefetch: true*/'./math').then(({minus})=>{
        console.log(minus(5,3));
    })
    // 预加载 跟懒加载效果相同
    // import(/* webpackChunkName: 'math', webpackPreload: true*/'./math').then(({minus})=>{
    //     console.log(minus(5,3));
    // })
})
document.body.appendChild(button);


fetch('/api/hello').then(res=>{
    res.text()
}).then(result=>{
    console.log(result,'fetch');
})