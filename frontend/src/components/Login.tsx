import { useState } from "react"
import { useNavigate } from "react-router-dom"
const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000"

function Login() {
    const navigate=useNavigate()
    const [email,setEmail]= useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const [message,setMessage]= useState<{text:string,type:"error"|"success"}>({text:"",type:"error"})

    async function Login(){
        try{
            setLoading(true)
            const response= await fetch(`${base_url}/api/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials:'include',
                body: JSON.stringify({email:email,password:password})
            })

            const result= await response.json()
            if(!response.ok)
            {
                return setMessage({text:result.message,type:"error"})
            }

            setMessage({text:result.message,type:"success"})
            navigate('/')


        }catch(error){
            setMessage({text:"Sudden error occured",type:"error"})
            console.log(error)
        }finally{
            setLoading(false)
             setTimeout(()=>{
                setMessage({text:"",type:"error"})
             },3000)
        }
    }
    
    
    function handleLogin(){
        if(!email || !password){
             setMessage({text:"All credentials are required",type:"error"})
             setTimeout(()=>{
                setMessage({text:"",type:"error"})
             },3000)
            return
        }

        Login()
    }

  return (
    <div>
        <h1>Login</h1>
        <div>
            <p>Email</p>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
            <p>Password</p>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" />
            <button disabled={loading} onClick={handleLogin}>Login</button>
        </div>
        {message.text.length>0 && <p className={`${message.type==="error"?"text-red-500":""}`}>{message.text}</p>}
    </div>
  )
}

export default Login