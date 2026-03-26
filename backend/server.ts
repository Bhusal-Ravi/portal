import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from "cors";
import './connections/db_connection.ts'

const PORT= process.env.PORT
if(!PORT) process.exit(1)

const app= express()
app.use(cors());
app.use(express.json())



app.listen(PORT,()=>{
    console.log(`Server Started in Port ${PORT}`)
})





