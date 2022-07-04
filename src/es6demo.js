
function getName(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('哈哈哈哈')
        },2000)
    })
}

async function helloName(){
    const name = await getName();
    console.log(name);
}

export default helloName;