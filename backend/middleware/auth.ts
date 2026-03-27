import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()



export  function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try{
        const token = req.cookies?.token;
         if (!token) {
      return res.status(401).json({ message: "No token" });
    }
        if (!process.env.SECRET_KEY) {
         throw new Error("SECRET_KEY not defined");
            }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; 
        next();

    }catch(error){
        console.log(error)
    return res.status(401).json({ message: "Invalid token. Please Login In Again" });
  
    }
}