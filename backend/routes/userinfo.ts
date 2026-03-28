
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { authMiddleware } from '../middleware/auth'
const router= express.Router()


router.get('/user',authMiddleware,async (req,res)=>{
    
    try{
        
        
        const {name,email}= req.user

        res.status(200).json({message:"success",data:{name,email}})


    }catch(error){
        res.status(500).json({message:"Failed to load users info"})
        console.log(error)
    }
})

export default router
