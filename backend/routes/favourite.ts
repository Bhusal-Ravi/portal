import {client} from '../connections/db_connection'
import dotenv from 'dotenv'
import express from 'express'
import { checkPropertyOwner, deleteFromFavourite, insertIntoFavourite, offsetPropertyQuery } from '../queries/property_query'
import { authMiddleware } from '../middleware/auth'
const router= express.Router()


router.put('/favourite/add',authMiddleware,async(req,res)=>{
    let db
    try{
        db= await client.connect()
        const {id}= req.body
        const user_id= req.user.id

        // const checkUser = await db.query(`${checkPropertyOwner}`,[id])
        // if(checkUser.rowCount===0 || user_id!==checkUser.rows[0].user_id){
        //     return res.status(401).json({message:"Not authorized to perform this action"})
        // }

        const insert= await db.query(`${insertIntoFavourite}`,[user_id,id])
        if(insert.rowCount===0){
             return res.status(401).json({message:"Failed to add property in favourite"})
        }

        return res.status(200).json({message:"Successfully added the propery to favourite"})
        

    }catch(error:any){
        console.log(error)
        if(error.code==='23505'){
            return res.status(401).json({message:"Failed to add property in favourite"})
        }
        return res.status(500).json({message:"Internal Server Error"})
    }finally {
        if(db){
            db.release()
        }
    }
})



router.put('/favourite/delete',authMiddleware,async(req,res)=>{
    let db
    try{
        db= await client.connect()
        const {id}= req.body
        const user_id= req.user.id

        // const checkUser = await db.query(`${checkPropertyOwner}`,[id])
        // if(checkUser.rowCount===0 || user_id!==checkUser.rows[0].user_id){
        //     return res.status(401).json({message:"Not authorized to perform this action"})
        // }

        const remove= await db.query(`${deleteFromFavourite}`,[user_id,id])
        if(remove.rowCount===0){
             return res.status(401).json({message:"Failed to remove property from favourite"})
        }

        return res.status(200).json({message:"Successfully removed the propery from favourite"})
        

    }catch(error:any){
        console.log(error)
        if(error.code==='23505'){
            return res.status(401).json({message:"Failed to remove the property from favourite"})
        }
        return res.status(500).json({message:"Internal Server Error"})
    }finally {
        if(db){
            db.release()
        }
    }
})


export default router