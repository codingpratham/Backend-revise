const http = require("http")

const server =  http.createServer((req,res)=>{
    res.end("Hello World")
})

server.listen(3000,()=>{
    console.log("localhost is ready on theport 3000");
    
})