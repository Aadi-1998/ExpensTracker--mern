const express = require('express');
const { loginController, registerController,getUserData } = require('../controllers/userController');

//   router object 
const router = express.Router();




//post router or login 
router.post('/login', loginController)

//    post || register

router.post('/register', registerController)
router.get('/getUser',getUserData)

module.exports = router;