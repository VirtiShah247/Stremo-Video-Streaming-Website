const express=require('express')
const morgan=require('morgan')
const dotenv=require("dotenv")
const connectDB =require('./db')

const app=express()
dotenv.config()
//port
const port= process.env.NODE_PORT || 5050
//config dotenv
// dotenv.config()
// MongoDb
connectDB()
app.use(express.json())
app.use(morgan('dev'))



app.use('/api/v1/user',require('./userrouting'))
app.get('/',(req,res)=>{
    res.send("Hello from backend")
})
//listening port
app.listen(port,()=>
{
    console.log(`Server running ${process.env.NODE_ENV} on ${process.env.NODE_PORT}`)
})
