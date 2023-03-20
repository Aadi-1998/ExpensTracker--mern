

const transactionModel =  require ('../models/transactionModel')
const moment = require ('moment')
const getAllTransaction = async(req,res)=>{
    try {
        const {frequency,selectedDate,type} = req.body
        const transactions = await transactionModel.find({
            // date:{
            //     $gt: moment().subtract(Number(frequency),'d').toDate(),
            // },
            ...(frequency !== 'custom'?{
                date:{
                $gt: moment().subtract(Number(frequency),'d').toDate(),
            },
            }:{
                date:{
                    $gte:selectedDate[0],
                    $lte:selectedDate[1]
                }
            }
            
            ),
            userid: req.body.userid,
            ...(type !== 'all' && {type})


        })
        res.status(201).send(transactions); 
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }
}

const addTransaction = async(req,res)=>{
    try {
        const newTransactions = new transactionModel(req.body)
        await newTransactions.save()
        res.status(201).send('Transaction added')

    } catch (error) {
        console.log(error)
        res.status(404).json(error)
        
    }

}

const editTransaction = async(req,res)=>{
    try {
        
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},
        req.body.payload
        )
        res.status(200).send('Edit successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}
const deleteTransaction = async(req,res)=>{
    try {
        await transactionModel.findByIdAndDelete({_id:req.body.transactionId})
        res.status(200).send('Deleted')
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }
}
module.exports= {getAllTransaction,addTransaction,editTransaction,deleteTransaction}