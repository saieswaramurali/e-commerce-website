import User from "../models/user.model.js";
import bcrypt from "bcryptjs" ; 
import jwt from "jsonwebtoken" ; 
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js" ; 

export const signUp = async (req, res) => {

    
    try {
        const {name, email, password} = req.body ; 

        if(!name) return res.status(400).json({error: "error no NAME is provided!!!"}) ; 
        if(!email) return res.status(400).json({error: "error no EMAIL is provided!!!"}) ; 
        if(!password) return res.status(400).json({error: "error no PASSWORD is provided!!!"}) ; 

        const existingUser = await User.findOne({email}) ; 

        if(existingUser) return res.status(409).json({message: "Email already exists!!!"}) ; 

        const salt = await bcrypt.genSalt(10) ; 
        const hashedPassword = await bcrypt.hash(password, salt) ; 

        const newUser = await User.create({name, email, password: hashedPassword}) ; 
        
        const token = jwt.sign({userId: newUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})


        res.status(201).json({
            success: true , 
            message: "User created successfully!!!", 
            data : {
                token, 
                user: newUser ,
            }
        }) ;

    } catch (error) {
        res.status(500).json({error: error.message}) ; 
    }

} ; 

export const signIn = async(req, res) => {
   try {
        const {email, password} = req.body ; 
        if(!email) return res.status(400).json({error: "No Email is provided"}) ; 
        if(!password) return res.status(400).json({error: "No password is provided"}) ; 

        const user = await User.findOne({ email }).select("+password");

        if(!user) return res.status(400).json({error: "the Email is not registered YET"}) ; 

        const validCreds = await bcrypt.compare(password, user.password) ; 

        if(!validCreds) return res.status(400).json({error: "invalid password"}) ; 

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN}) ; 

        res.status(200).json({
            success: true  , 
            data : {
                token, 
                User: user , 
            }
        }) ; 

   } catch (error) {
    return res.status(500).json({error: error.message}) ; 
   } 
} ; 

export const signOut = (req, res) => {
    res.send('signed-out successfully') ; 
} ; 
