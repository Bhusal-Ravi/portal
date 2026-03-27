import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
const saltRounds= Number(process.env.SALT_ROUNDS)

export async function generateHash(text:string):Promise<string>{
    try{

        const hash= await bcrypt.hash(text,saltRounds)
        return hash

    }catch(error){
        console.log(error)
        throw new Error (`Failed to generate hash`)
    }
}

export async function comparePasswordHash(text:string,hash:string):Promise<boolean>{
    try{
       const match= await  bcrypt.compare(text,hash)
        return match
    }catch(error){
        console.log(error)
        throw new Error
    }
}