import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
// import { redisClient } from '../config/redisClient.js';
import jwt from 'jsonwebtoken';
import logger from "../utils/logger.js";

export const signup = async (req,res)=>{
    try{
        const { UserPassword, ...userInfo } = req.body;
        logger.info({ user: userInfo }, "Signup request received");

        const {UserName,UserRole,UserEmail} = req.body;

        const userExist = await User.findOne({UserEmail})
    
        if(userExist){
            return res.status(400).json({success:false,message:"User already exists"}); 
        }

        const user = await User.create({UserName,UserRole,UserEmail,UserPassword: req.body.UserPassword})

        logger.info({ user: { id: user._id, email: user.UserEmail } }, "User created successfully");
        res.status(201).json({success:true,message:"User created successfully"});  
    }catch(error){
        logger.error({ err: error }, "Error during signup");
        res.status(500).json({success:false,message:error.message});
    }
};

export const login = async (req,res)=>{
    const loginData = req.body;
    if (!loginData['loginEMail']||!loginData['Password']){
        res.status(400).json({error:true,data:"Bad requrest Email and password is required"})
    }
    logger.info(`login controller is called with login data ${loginData}`)
    const userdata = await User.findOne({UserEmail:loginData['loginEMail']})
    logger.info("userdata",userdata)
    
    if(!userdata){
        res.status(404).json({error:true,data:"User not found"})
    }
    const comparisonresult = await bcrypt.compare(loginData['Password'],userdata.UserPassword)
    if (!comparisonresult){
        return res.status(401).json({error:true,data:"Invalid credential"})
    }
    // console.log("comparisonresult",comparisonresult)
    res.send({error:false,data:userdata})
}

export const logout = async (req,res)=>{
    res.send("this is logout controller")   
}






