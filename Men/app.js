const http = require("http")

const server =  http.createServer((req,res)=>{
    if(req.url === "/about"){
        res.end("about page")
    }else{
        res.end("Kuch bhi h bhai")
    }
})

server.listen(3000,()=>{
    console.log("localhost is ready on theport 3000");
    
})