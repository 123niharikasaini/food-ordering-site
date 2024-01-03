import express from "express";
import { Item } from '../Module/Item.js'
import { foodCategory } from '../Module/FoodCategory.js'
import { user } from '../Module/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {body, validationResult} from 'express-validator'

const routerAdmin=express.Router()
const saltRounds = 10;
const securePassword=await bcrypt.hash("admin", saltRounds)

routerAdmin.get('/',async(request,response)=>{
    return response.status(200).send("Welcome admin")
})

// login the admin
routerAdmin.post('/login',
body('password',"Password must contain minimum 5 characters").isLength({min:5})
,async(req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
            // if some error
            return res.status(400).json({error:error.array()})
        }

    try{
        
        const cmpPwd=await bcrypt.compare(req.body.password,securePassword)
        // if same, cmpPwd is true

        if(!cmpPwd){
            return res.status(400).send({msg:"password is incorrect"})
        }
        
        // if user is authenticated

        // payload
        const data={
            user:{
                name:"admin"
            }
        }
        const authToken=jwt.sign(data,process.env.SECRET)
        return res.json({Success:true,authToken:authToken})

    }catch(error){
        return res.status(500).send({msg:error.message})
    }
})

// =======================================================================

// http route to add data to database
routerAdmin.post('/create',async(req,res)=>{
    try{
        const data=req.body;
        if(!data.categoryName || !data.name || !data.img || !data.options || !data.description)
        {
            return res.status(400).send({msg:"Enter all fields"})
        }
        else{
            await Item.create(data);
            return res.status(201).send({msg:"Item created successfully"})
        }
    }catch(error){
        return res.status(500).send({msg:error.message})
    }
})

// =====================================================================
// http route for adding category
routerAdmin.post("/createCategory",async(request,response)=>{
    try{
        const data=request.body;
        if(data.categoryName){
            await foodCategory.create(data)
            return response.status(201).send({msg:"Category added"})
        }
        else{
            return response.status(400).send({msg:"enter the category name"})
        }
    }catch(error){
        return response.status(500).send({msg:error.message})
    }
})

export default routerAdmin