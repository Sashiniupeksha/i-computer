import User from "../models/user.js"
import bcrypt from "bcrypt"

   export function createUser (req,res){

    const data = req.body
    const hashedpassword = bcrypt.hashSync(data.password,10)
    
const user = new User({
    email : data.email,
    firstName : data.firstName,
    lastName : data.lastName,
    password : hashedpassword,
    role: data.role,
})

    user.save().then(
       ()=>{
           res.json({
               message : "User Created Successfully"
         })
      }
    )
}

export function loginUser (req, res){
    const email = req.body.email
    const password = req.body.password

    User.find({email : email}).then(
        (users)=>{
            if(users[0] == null){
                res.json({
                    message : "User not found"
                })
            }else{
                const user = users[0]
                res.json(user)

                const isPasswordCorrect = bcrypt.compareSync(password, user.password)
                if(isPasswordCorrect){
                    const payload = {
                        email : user.email,
                        firstName : user.firstname,
                        lastName : user.lastName,
                        role : user.role,
                        isEmailverified : user.isEmailVerified,
                        image : user.image
                    };
                    const token = jwt.sign(payload, process.env.JWT_SECRET,{
                        expiresIn : "48h"
                    })

                   res.json({
                message:"Login Successfull",
                token : token,
                role: user.role,
                
                });
            }else{
                res.status(401).json({
                    message:"Invaild password"
                });
            }
                
                  
        }
            })
        }

        export function isAdmin(req){
            if(req.user == null){
               
                return false
            }
            if(req.user.role != "admin"){
               
                return false
            }
            return true
        }
        

               
        

