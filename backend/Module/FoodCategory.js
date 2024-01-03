import mongoose from "mongoose";

const categorySchema=mongoose.Schema(
    {
        "categoryName":{
            type:String,
            required:true
        }
    }
)

export const foodCategory=mongoose.model('FoodCategory',categorySchema)