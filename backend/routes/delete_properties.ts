import {client} from '../connections/db_connection'
import dotenv from 'dotenv'
import express from 'express'
import { checkPropertyOwner, deleteFromFavourite, deleteProperty, insertIntoFavourite, offsetPropertyQuery } from '../queries/property_query'
import { authMiddleware } from '../middleware/auth'
const router= express.Router()


router.delete('/delete/:id',authMiddleware,async(req,res)=>{
    let db
    try{
        db= await client.connect()
        const user_id=req.user.id
        const id= req.params.id

        if(!id) return res.status(400).json({message:"Required params not provided"})

        const deleteProp= await db.query(`${deleteProperty}`,[id,user_id])

        if(deleteProp.rowCount===0){
            return res.status(403).json({message:"Not authorized to perform the action"})
        }

        
        return res.status(200).json({message:"Sucessfully deleted the property"})

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
})

export default router