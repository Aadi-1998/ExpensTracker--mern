const mongoose= require("mongoose");

const transactionSchema = new mongoose.Schema({

    userid:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:[true,"amount is required"]
    },

    type:{
        type:String,
        require:[true,'Type is required']

    },
    category:{
        type:String,
        require:[
            true,"category is required"
        ]
    },
    reference:{
        type:String,
    },
    description:{
        type:String,
        required:[true,'description ']
    },
    date:{
        type:Date,
        required:[true,"data is required"]
    }

},{timeStamp:true})

const transactionModel = mongoose.model('transactions',transactionSchema);

module.exports= transactionModel