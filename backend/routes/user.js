import express from 'express'
import { user } from '../Module/User.js'
import {body, validationResult} from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const auth=express.Router();


// http route to add user
auth.post('/createUser',
// using validators
body('email',"Incorrect email").isEmail(),
body('password',"Password must contain minimum 5 characters").isLength({min:5}),
async(req,res)=>{
    
        const error=validationResult(req)
        if(!error.isEmpty()){
            // if some error
            return res.status(400).send({error:error.array()})
        }

    try{
        // for hashing the password
        const saltRounds = 10;
        let securePassword=await bcrypt.hash(req.body.password, saltRounds)

    
        await user.create({
            name:req.body.name,
            email:req.body.email,
            password:securePassword,
            location:req.body.location,
        })
     return res.status(201).send({msg:"User Created"})
    
 
         
    }
    catch(error){
        return res.status(500).send({msg:error.message})
    }
})


// ===========================================================================

// http route for login
auth.post('/login',
body('email','Incorrect email').isEmail(),
body('password',"Password must contain minimum 5 characters").isLength({min:5}),
async(request,response)=>{

    const error=validationResult(request)
    if(!error.isEmpty()){
            // if some error
            return response.status(400).json({error:error.array()})
        }

    try{
        // const {password}=request.body.password;
        const email=request.body.email;
        // object is passed to findOne()
        const obj=await user.findOne({'email':email});
        // obj will have all data

        if(!obj){
            // user not found
            return response.status(400).send({msg:"Email not found"})
        }
        const cmpPwd=await bcrypt.compare(request.body.password,obj.password)
        // if same, cmpPwd is true

        if(!cmpPwd){
            return response.status(400).send({msg:"Email or password is incorrect"})
        }
        
        // if user is authenticated

        // payload
        const data={
            user:{
                id:obj._id
            }
        }
        const authToken=jwt.sign(data,process.env.SECRET)
        return response.json({Success:true,authToken:authToken})

    }catch(error){
        return response.status(500).send({msg:error.message})
    }
})

export default auth