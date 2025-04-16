const express= require("express")
const app = express()
const morgan= require("morgan")

app.use(morgan('dev')) // Log requests to the console
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public")) // Serve static files from the public directory

app.set('view engine','ejs')

let count=0

app.use((req,res,next)=>{
    count++
    console.log(`Request number: ${count}`)
    console.log(`Method: ${req.method}`)
    next()
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/get-form-data',(req,res)=>{
    console.log(req.body);
    res.send('Form data received')
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