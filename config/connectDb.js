const mongoose = require('mongoose')
const colors = require('colors');

const connectDb = async ()=>{
    try{
         await  mongoose.connect("mongodb+srv://AdityaPandey:Ankur@cluster0.pqp0xla.mongodb.net/crudApp?retryWrites=true&w=majority")
        console.log(`Server Running on ${mongoose.connection.host}`.bgCyan.white)
    }
    catch(error){
        console.log(`${error}`.bgRed);

    }
}

module.exports = connectDb;