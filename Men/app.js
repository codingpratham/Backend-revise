const express= require("express")
const app = express()

app.set('view engine','ejs')

app.use((req,res,next)=>{
    console.log('Middleware 1')
    next()
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.get ('/about',(req,res)=>{
    res.send('About us')
})

app.get ('/contact',(req,res)=>{
    res.send('Contact us')
})

app.get ('/services',(req,res)=>{
    res.send('Services')
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
    console.log('http://localhost:3000')
})