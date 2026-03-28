
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

const router= express.Router()


router.get('/health',async(req,res)=>{
    try{
        return res.status(200).json("Health Ok")
    }catch(error){
        console.log(error)
        return res.status(500).json("Server Down")
    }
})

export default router
