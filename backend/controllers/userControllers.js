const asyncHandler = require("express-async-handler")
const User=require("../Models/userModel");
const generateToken = require("../config/generatewebToken");

// Register Controller
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,pic}=req.body

    if(!name || !email|| !password){
        res.status(400);
        throw new Error("Plzz enter  all the fields ")
    }

    //User Exists in the database
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists ")
    }


    const user=await User.create({
        name,
        email,
        password,
        pic
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
     res.status(400);
     throw new Error("User not found");
    }

});

// Login Controller
const authUser=asyncHandler(async(req,res)=>{
    
    const{email,password}=req.body;

    //If User Exists
    const user=await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
     res.status(400);
     throw new Error("Invalid email or password");
    }

})

module.exports={registerUser,authUser};



