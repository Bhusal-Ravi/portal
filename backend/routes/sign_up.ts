import {client} from '../connections/db_connection'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'


import { generateHash } from '../service/password_action'
import { createUser } from '../queries/user_queries'
import { validateSignup } from '../middleware/validate_signup'

const router= express.Router()

router.post('/signup',validateSignup, async (req,res)=>{
    let db
    try{
        db= await client.connect()
        await db.query(`BEGIN`)
        const {email,password,name}= req.body

        if(!email || !password|| !name) {
           return  res.status(400).json({message:"Required fields are not provided"})

        }

        // Generate pass hash
        const password_hash= await  generateHash(password)
        
        const newUser= await db.query(`${createUser}`,[name,email,password_hash])
        if(newUser.rowCount===0){
            await db.query('ROLLBACK');
          return  res.status(500).json({message:"Failed to signup"})
        }

        await db.query('COMMIT');
       return res.status(201).json({message:"SignUp Successful, please login"})




    }catch(error:any){
         if(db){
                await db.query('ROLLBACK');
            }
        if(error.code==='23505')
        {
            return res.status(409).json({message:"User already exists"})
        }
       
        return res.status(500).json({message:"Internal Server Error"})
         
    }finally {
        if(db){
            db.release()
        }
    
}
})

export default router