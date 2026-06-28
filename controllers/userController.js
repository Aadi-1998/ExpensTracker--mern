const userModel = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");

// const secretKey = 'SecretKey'

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find user
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    // create JWT token

    const token = jsonwebtoken.sign({ id: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    // send response with user

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      error: "not working",
    });
  }
};

//  register callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(401).json({
      success:false,
      message:'Hi',
      error
    })
  }
};

module.exports = { loginController, registerController,getUserData };
