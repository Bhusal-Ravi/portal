import {client} from '../connections/db_connection'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import express from 'express'

import { checkUser } from '../queries/user_queries'
import { User_Type } from '../types/user'
import { comparePasswordHash } from '../service/password_action'
import { validateLogin } from '../middleware/validate_login'
const router= express.Router()

const SECRET_KEY= process.env.SECRET_KEY

router.post('/login',validateLogin, async(req,res)=>{
    let db
    try{
        db=await client.connect()
        const {email,password}= req.body
        if(!email || !password){
            return res.status(400).json({message:"Required fields are not provided"})
        }

        const user_check= await db.query(`${checkUser}`,[email])
        if(user_check.rowCount===0){
            return res.status(404).json({message:"User not registered, Sign up first"})
        }

        const user:User_Type= user_check.rows[0]
        const name= user.name
        const id= user.id
        
        const db_password_hash= user.password_hash
        

        const comparision= await comparePasswordHash (password,db_password_hash)
        if(!comparision){
            return res.status(401).json({message:"Invalid Credentials"})
        }
        

        const token= jwt.sign({
            id:id,
            name:name,
            email:email
        },SECRET_KEY!,{expiresIn:'1h'})



        
        res.cookie('token',token,{
            httpOnly:true,
            sameSite: process.env.SAME_SITE as 'lax' | 'strict' | 'none',
            secure: process.env.SECURE === 'true'
        })

      return  res.status(200).json({message:"Login Succesfull"})

    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }finally{
        if(db){
            db.release()
        }
    }
})

export default router