const http = require('http')

const appp = http.createServer((req,res)=>{
    if(req.url == '/api/hello'){
        res.end('hello node')
    }
})
appp.listen(9000,'localhost',()=>{
    console.log('localhost:9000');
})