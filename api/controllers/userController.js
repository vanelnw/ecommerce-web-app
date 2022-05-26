const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken") 

const User = require("../models/User");
const Product = require("../models/Product");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, picture } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password),
      picture,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});


//get users

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users)

  } catch (error) {
    res.status(400).json(error)
  }
})

//getOneUser
const getSingleUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
})


//updateuser

const updateUser = asyncHandler(async (req, res) => {

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    },
      { new: true });
    
    res.status(200).json(updatedUser)
    
  } catch (error) {
    res.status(500).json(err)
  }

}) 

//update profile

const updateUserProfile = asyncHandler(async (reeq, res) => {
  
})

//delete user

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    !user && res.status(400).send("User is not found with this id");

    await user.remove();
    res.status(200).json("user  deleted successfully");

  } catch (error) {
    res.status(404).json(error);
  }
  
})

//get user stats
const getUserStats = asyncHandler(async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt"}, }, },
      {
        $group: {
          _id: "$month",
          total:{$sum:1},
      }}
    ])

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
})



module.exports = {registerUser,  authUser,getAllUsers,updateUser,deleteUser,getSingleUser,getUserStats}
