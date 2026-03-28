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
import userRoute from './routes/userinfo'
import userPropertyRoute from './routes/user_property'
import userFavouriteRoute from './routes/user_favourite'
import deletePropertyRoute from './routes/delete_properties'
import addPropertyRoute from './routes/add_property'
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
app.use('/api',userRoute)
app.use('/api',userPropertyRoute)
app.use('/api',userFavouriteRoute)
app.use('/api',deletePropertyRoute)
app.use('/api',addPropertyRoute)

app.listen(PORT,()=>{
    console.log(`Server Started in Port ${PORT}`)
})





