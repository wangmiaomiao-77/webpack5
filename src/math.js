
// export 在一个文件里面可以暴露多个，并且引入需要对象解构使用，引用变量与抛出变量相同
// export default 在一个文件只能暴露一个，并且导入没有花括号，接受变量可以是任意字段
export const add = (x,y)=>{
    return x+y;
}

export const minus = (x,y)=>{
    return x-y
}