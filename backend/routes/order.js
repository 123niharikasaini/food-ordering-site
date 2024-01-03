import express from 'express'
import { order } from '../Module/Order.js';
import { user } from '../Module/User.js';

const ord=express.Router();


// route for adding data in the order database
ord.post('/orderdata',async(req,res)=>{
    let data=req.body.order_data
     
    let email=req.body.userEmail
    await data.splice(0,0,{Order_date: req.body.order_date})

    // checking if user is valid or not
    let present=await user.findOne({'email':email})
    
    if(present!==null){
        // if user is valid

        // checking if the user has ordered for the first time or not
        let eID=await order.findOne({'email':email})
        if(eID===null){
            // ordered for the first time
            try{
                await order.create({
                    email:email,
                    order_data:[data]
                }).then(()=>{res.json({success:true})})
            }
            catch(error){
                    res.status(500).send({msg:error.msg})
                }
            
        }

        else{
            try{
                
                await order.findOneAndUpdate(
                    {email:email},
                    // pushing the data to an array
                    {$push:{order_data:data}}
                    )
                .then(()=>{res.json({success:true})})
            }catch(error){
                res.send("Server Error",error.message)
            }
        }
    }else{
        // not an user
        return res.status(400).send({msg:"Not an user"})
    }

    
})

// ====================================================================

// http route for sending data from server in simplied form to client
ord.post('/myorderdata',async(req,res)=>{
    // post method is used because we need email from the client-side
try{

    let email=req.body.email;
    // console.log(email)
    let data=await order.findOne({'email':email})
    // console.log(data.order_data[0][0])

    // converting the data fetched to easier form of a object 
    // key as the date and the value as an array of objects(items details)
    // let arr=[]
    let obj={}
    data.order_data.map((val)=>{
        // console.log(val[0].Order_date)
        if(obj[val[0].Order_date]===undefined)
        {obj[val[0].Order_date]=[]}

        for(let index in val){
            if(index>0){
                obj[val[0].Order_date].push(val[index])
            }
        }

        // arr.push(obj)
        // obj={}
        
    })
    // console.log(obj)
    return res.send(obj)

}catch(error){
    return res.status(500).send({msg:error.message})
}
})


export default ord;