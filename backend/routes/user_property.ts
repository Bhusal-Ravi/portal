import {client} from '../connections/db_connection'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { listuserProperty } from '../queries/property_query'
import { authMiddleware } from '../middleware/auth'
const router= express.Router()


router.get('/userproperty',authMiddleware,async (req,res)=>{
   let db
    try{
        db=await client.connect()
        const user_id= req.user.id
        const rawLimit = Number(req.query.limit ?? 10)
        const rawOffset = Number(req.query.offset ?? 0)
        const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : 10
        const offset = Number.isFinite(rawOffset) && rawOffset >= 0 ? rawOffset : 0
        console.log(offset, limit)

        const property= await db.query(`${listuserProperty}`,[user_id, limit, offset])

        if(property.rowCount===0){
            return res.status(404).json({message:"No property found"})
        }

        return res.status(200).json({message:"Success",data:property.rows})

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