import {client} from '../connections/db_connection'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { insertProperty } from '../queries/property_query'
import { authMiddleware } from '../middleware/auth'
import { validateProperty } from '../middleware/validate_property'
const router= express.Router()


router.post('/property/add',authMiddleware,validateProperty,async(req,res)=>{
    let db
    try{
        db= await client.connect()
        const user_id= req.user.id
        const {name,location,image_url}= req.body

        if(!name || !location || !image_url){
            return res.status(400).json({message:"Required fields are not provided"})
        }

        const insert= await db.query(`${insertProperty}`,[user_id,name,location,image_url])
        if(insert.rowCount===0){
            return res.status(500).json({message:"Failed to add property"})
        }

        return res.status(201).json({message:"Property added successfully"})

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }finally{
        if(db){
            db.release()
        }
    }
})

export default router
