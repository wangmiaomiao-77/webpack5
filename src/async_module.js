
function getElement(){
    // import 返回的是promise
    return import('lodash').then(({default: _})=>{
        const element = document.createElement('div');
        element.innerHTML = _.join(['hello','webpack555'], ' ');
        return element;
    })
}

getElement().then(element =>{
    document.body.appendChild(element)
})