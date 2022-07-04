/*
 * @Description: 
 * @Date: 2022-06-22 10:07:21
 */

;(function(){
    var name = 'lalala';
})()
console.log(name);


var result = (function(){
    var name = '啊啊啊';
    return name;
})()
console.log(result);


const add = (x,y)=>{
    return x+y;
}

export default add;