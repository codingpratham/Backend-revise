const express= require("express")
const app = express()
const morgan= require("morgan")
const userModel= require("./models/user.js")
const dbConnection=require("./config/db.js")

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

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async(req,res)=>{
    const {name ,email,password}=req.body
    if(!name || !email || !password){
        return res.status(400).send('All fields are required')
    }

    try {
        const user = new userModel({
            username:name ,
            email,
            password
        })
        await user.save()
        res.status(201).send('User registered successfully')
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal server error')
    }
})

app.get('/users',async(req,res)=>{
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal server error')
    }
})

app.put("/update",async(req,res)=>{

    const update =await userModel.findOneAndUpdate({
        username:"Pratham"
    },{
        email:"c@c.com"
    })
    
    if(!update){
        return res.status(404).send('User not found')
    }
    res.status(200).send('User updated successfully')
})

app.delete("/delete",async(req,res)=>{

    const deleted =await userModel.findOneAndDelete({
        username:"Pratham"
    })

    if(!deleted){
        return res.status(404).send('User not found')
    }
    res.status(200).send('User deleted successfully')
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
    console.log('http://localhost:3000')
})