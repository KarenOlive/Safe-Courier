import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import users from '../models/usersSchema.js';
import parcels from '../models/parcelOrderSchema.js';
import { userLogIn, userSignUp } from '../helpers/validation.js';

export const show_decoded_token_data = async (req, res)=>{
    res.send(req.userData)
}


export const user_signup = async (req, res)=>{
    
    const { error } =  userSignUp(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //Checking if user is already in the database
    const emailExist = await users.findOne({Email: req.body.Email});
    if(emailExist) return res.status(400).send("Email already exists");
    
   try{
       

       const salt = await bcrypt.genSalt()
       const hashedPassword = await bcrypt.hash(req.body.Password, salt)

        // can also use 'await users.create({})'
       const user = await new users({
           Fullname: req.body.Fullname,
           Email: req.body.Email,
           Password: hashedPassword
       });
       await user.save()
       res.status(201).json({
           user: user,
           message: "You have successfully signed up"
       })
       console.log('A new user has signed up');

   }
   catch(err){
       res.json({
           message: "Failed to sign up"
       })
       console.log(err);
   }
   
}


export const user_login = async (req, res)=>{

    const { error } =  userLogIn(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await users.findOne({Email: req.body.Email})
    if(!user){
         return res.status(400).json({message: "Wrong Email"});
        } 

    try{
      
        

        const validPassword = await bcrypt.compare(req.body.Password, user.Password);
        if(!validPassword) {
            return res.status(400).json({message: "Wrong Password"})
        }
        
        else{
           const token = jwt.sign(
                {
                    userId: user._id,
                    Email: user.Email,
                    Fullname: user.Fullname
                },
                 process.env.JWT_KEY,
                {
                    expiresIn: "2h"
                }
            );
            
            res.header('auth-token',token);   
            res.status(200).json({
                message: "Log In successful",
                token: token
               
            })
            console.log('User has logged in');
        }
    }
    catch(err){
        res.status(500).json({
            message: "Failed to log in"
        })
        console.log(err)
    }
}


