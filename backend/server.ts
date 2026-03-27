import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors";

import './connections/db_connection'
import signUpRoute from './routes/sign_up'
import loginRoute from './routes/login'
import propertyRoute from './routes/properties_list'
import favouriteRoute from './routes/favourite'

const PORT= process.env.PORT
if(!PORT) process.exit(1)
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

const app= express()
app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json())

app.use('/api',signUpRoute)
app.use('/api',loginRoute)
app.use('/api',propertyRoute)
app.use('/api',favouriteRoute)

app.listen(PORT,()=>{
    console.log(`Server Started in Port ${PORT}`)
})





