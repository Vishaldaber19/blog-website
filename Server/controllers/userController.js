const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// Register User Controller

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //Validation
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please Fill all fields",
        success: false,
      });
    }
    //existing user check
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "user already exists",
        success: false,
      });
    }

    //Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const new_user = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await new_user.save();
    return res.status(201).send({
      message: "New user created",
      success: true,
      new_user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

// Get all users controller

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({});
    return res.status(201).send({
      userCount: allUsers.length,
      message: "all users data",
      success: true,
      allUsers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error in getting all users",
      success: false,
      error,
    });
  }
};

// User Login Controller

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation
    if (!email || !password) {
      return res.status(401).send({
        message: "Please provide email or password",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    //User existance
    if (!user) {
      return res.status(200).send({
        message: "email is not registerd",
        success: false,
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid username or password",
        success: false,
      });
    }
    return res.status(200).send({
      message: "User Login successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in login callback",
      success: false,
      error,
    });
  }
};

module.exports = { getAllUsers, registerUser, loginUser };
