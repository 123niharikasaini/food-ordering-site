import express, { response } from 'express'
import { Item } from '../Module/Item.js'
import { foodCategory } from '../Module/FoodCategory.js'
import { user } from '../Module/User.js'
import {body, validationResult} from 'express-validator'




const router=express.Router()


// ===========================================================================

// normal route
router.get('/',async(request,response)=>{
    return response.status(200).send("Working fine")
})

// ===========================================================================

router.get('/filter',async(req,res)=>{
    try{
        let query={};
        // making the query
        if(req.query?.category){
            query={categoryName:req.query.category}
        }

        const result=await Item.find(query);
        res.status(200).send(result);

    }catch(error){
        return res.status(500).send({msg:error.message})
    }
})



// ========================================================================================
router.get('/category',async(request,response)=>{
    try{
        const categories=await foodCategory.find();
        return response.status(200).send(categories)

    }catch(error){
        return response.status(500).send({msg:error.message})
    }
})

// ===========================================================================



// http route for getting all items from database
router.get('/items',async(req,res)=>{
    try{
        const items=await Item.find();
        return res.status(200).send(items)


    }catch(error){
        return res.status(500).send({msg:error.message})
    }
})


export default router;