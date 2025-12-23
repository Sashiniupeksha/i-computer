import product from "../models/Product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){
   if(! isAdmin (req)){
    res.status(403).json({
        message:"Forbidden"
    })
    return
   }
    const product = new product(req.body)

    product.save().then(
        ()=>{
            res.json({
                message:"product created successfully"
            })
        }
    
    ).catch(
        (error)=>{
            res.status(500).json({
                message:"Error creating product",
                error: error.message
            })
        }
    )
}

export function getAllProducts (req, res){
    if(isAdmin(req)){
        product.find().then(
            (products)=>{
                res.json(products)
            }
        ).catch(
            (error)=>{
                res.status(500).json({
                    message:"Error fetching products",
                    error: error.message
                })
            }
        )
    }else{
        product.find({isAvailable : true}).then(
            (products)=>{
                res.json(products)
            }
        ).catch(
            (error)=>{
                res.status(500).json({
                    message:"Error fetching products",
                    error: error.message
                })
            }
        )
    }
}

export function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message:"only admin can delete products"
        })
        return
    }
    const productID = req.params.productID
    product.deleteOne({productID:productID}).then(
        ()=>{
            res.json({
                message:"product deleted successfully"
            })
        }
    )
}


export function updateProduct(req, res) {

    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Only admin can update products"
        });
    }

    const productID = req.params.productID;

    product.updateOne(
        { productID: productID },
        req.body
    )
    .then(() => {
        res.json({
            message: "Product updated successfully"
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Product update failed",
            error: error.message
        });
    });
}

export function getProductByID(req, res){
    const productID = req.params.productID
    product.findOne({productID:productID}).then(
        (product)=>{
            if(product==null){
                res.status(404).json({
                    message:"product not found"
                })
            }
            else{
                res.json(product)
            }
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                message:"Error fetching product",
                error:error.message
            })
        }
    )
}



