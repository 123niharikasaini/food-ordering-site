import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import router from "./routes/route.js";
import routerAdmin from "./routes/admin.js";
import auth from "./routes/user.js";
import ord from "./routes/order.js";


const app=express();
const PORT=process.env.PORT||5000;
dotenv.config({path:'./config.env'})

// middleware for allowing only authorize weppage access
app.use(cors(
    {
        origin:["https://food-ordering-site-gray.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
))
// to parse the incoming JSON request and make it available in request.body object
app.use(express.json())


// http routes
app.use('/',router)
// for adding data to database
app.use('/admin',routerAdmin)
// for creating users
app.use('/auth',auth)
// for creating orders
app.use('/',ord)


// connecting 
app.listen(PORT,()=>{
    console.log(`Application running successfully on Port:${PORT}`)
})



// connection to database
const db=process.env.DATABASE;
mongoose.connect(db)
.then(()=>{console.log("Connection successful to database")})
.catch((error)=>{console.log(error)})