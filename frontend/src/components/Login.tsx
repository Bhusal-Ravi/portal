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
                body: JSON.stringify({email:email.toLowerCase(),password:password})
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

    function validEmail(email:string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function validPassword(password:string){
    if(password.length<8 || password.length>16){
        return false
    }
    else return true
}
    
    
    function handleLogin(){
        if(!email || !password){
             setMessage({text:"All credentials are required",type:"error"})
             setTimeout(()=>{
                setMessage({text:"",type:"error"})
             },3000)
            return
        }

        const emailCheck=validEmail(email)
        if(!emailCheck){
            setMessage({text:"Pattern of email is not valid",type:"error"})
             setTimeout(()=>{
                setMessage({text:"",type:"error"})
             },3000)
            return
        }

        const passwordCheck= validPassword(password)
        if(!passwordCheck){
            setMessage({text:"Password must be length min: 8 & max:16",type:"error"})
             setTimeout(()=>{
                setMessage({text:"",type:"error"})
             },3000)
            return
        }



        Login()
    }

  return (
    <div className="min-h-screen bg-white px-6 pt-24 pb-10">
        <div className="max-w-md mx-auto mb-6">
            <h1 className="text-5xl font-semibold text-gray-900 tracking-tight text-center">Assignment</h1>
        </div>
        <div className="max-w-md mx-auto border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Welcome Back</p>
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-6">Login</h2>

            {message.text.length>0 && <p className={`mb-4 text-sm ${message.type==="error"?"text-red-500":"text-gray-700"}`}>{message.text}</p>}

            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-700 mb-1">Email</p>
                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-gray-900" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
                </div>
                <div>
                    <p className="text-sm text-gray-700 mb-1">Password</p>
                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-gray-900" value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" />
                </div>
                <button className="w-full bg-black text-white rounded-lg py-2.5 disabled:opacity-60" disabled={loading} onClick={handleLogin}>{loading?"Logging in...":"Login"}</button>
                <button className="w-full border border-gray-300 text-gray-900 rounded-lg py-2.5" onClick={()=>navigate('/signup')}>Go to Signup</button>
            </div>
        </div>
    </div>
  )
}

export default Login