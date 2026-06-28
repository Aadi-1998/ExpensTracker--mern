const express = require('express')

const {getAllTransaction,addTransaction,editTransaction,deleteTransaction, getAllTran} = require ('../controllers/transactionController');
const transactionModel = require('../models/transactionModel');
const authMiddleware = require('../middleware/authMiddleware')

//routes object
const router = express.Router();

// routes

// get transaction 
router.post('/getTransaction',authMiddleware,getAllTransaction)

//get transaction 

router.get('/getAllTran',getAllTran)

// get transactions POST Method
router.post('/addTransaction', authMiddleware,addTransaction)

// Edit transaction POST method
router.post('/editTransaction',authMiddleware,editTransaction)


// Delete transaction POST method
router.post('/deleteTransaction',authMiddleware,deleteTransaction)

module.exports=router