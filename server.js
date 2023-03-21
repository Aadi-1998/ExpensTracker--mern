 const express = require('express');
 const cors = require('cors')
 const morgan = require('morgan')
 const dotenv = require("dotenv")
const colors = require('colors');
const connectDb = require('./config/connectDb');
const path = require('path')

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);


//config dot env file
dotenv.config();

connectDb()

//rest object
 const app = express();

 //middleware

 app.use(morgan('dev'))
 app.use(express.json( ))
 app.use(cors())

 //routes

//  app.get('/', (req,res)=>{
//     res.send("<h1>Hi server is working fine</h1>")
//  })

app.use('/users',require('./routes/userRoute'))


// transaction route

app.use('/transactions',require('./routes/transactionRoute'))

//static files

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
   res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//PORT
 const PORT = 8000 || process.env.PORT


 //listen
 app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
 })