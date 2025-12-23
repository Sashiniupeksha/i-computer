import mongoose from "mongoose";

const productschema = new mongoose.Schema (
    {
        productID :{
            type: String,
            required: true,
            unique:true
        },
        name:{
            type:String,
            required: true
        },
        altNames:{
            type:[String],
            default:[]
        },
        description:{
            type: String,
            required: true
        },
        price:{
            type:Number,
            required: true
        },
        labelledprice:{
            type:Number,
            required: true
        },
        images:{
            type:[String],
            required: true
        },
        category:{
            type: String,
            required:true
        },
        brand:{
            type: String,
            required: true,
            default:"No brand"
        },
        stock:{
            type: Number,
            required: true,
            default:0
        },
        isAvailable:{
            type: Boolean,
            default: true
        }

        
    }
)

const product = mongoose.model("Product", productschema)
export default product;