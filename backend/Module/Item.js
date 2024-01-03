import mongoose from "mongoose";

const itemSchema=mongoose.Schema(
    {
        'categoryName':{
            type:String,
            required:true
        },
        'name':{
            type:String,
            required:true
        },
        'img':{
            type:String,
            required:true
        },
        'options':{
            type:Array,
            required:true
        },
        'description':{
            type:String,
            required:true
        },
    }
)

export const Item=mongoose.model('Item',itemSchema)
//                                  |
//                            collection name in database
                                
