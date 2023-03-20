const express = require('express')

const {getAllTransaction,addTransaction,editTransaction,deleteTransaction} = require ('../controllers/transactionController');
const transactionModel = require('../models/transactionModel');

//routes object
const router = express.Router();

// routes

// get transaction 
router.post('/getTransaction',getAllTransaction)

// get transactions POST Method
router.post('/addTransaction', addTransaction)

// Edit transaction POST method
router.post('/editTransaction',editTransaction)


// Delete transaction POST method
router.post('/deleteTransaction',deleteTransaction)

module.exports=router