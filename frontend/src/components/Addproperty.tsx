import { useState } from "react"
import { useNavigate } from "react-router-dom"
const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000"

function Addproperty() {
  const navigate=useNavigate()
  const [name,setName]= useState<string>("")
  const [location,setLocation]= useState<string>("")
  const [image_url,setImageUrl]= useState<string>("")
  const [loading,setLoading] = useState<boolean>(false)
  const [message,setMessage]= useState<{text:string,type:"error"|"success"}>({text:"",type:"error"})

  async function addProperty(){
    try{
      setLoading(true)
      const response= await fetch(`${base_url}/api/property/add`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include',
        body: JSON.stringify({name:name,location:location,image_url:image_url})
      })

      const result= await response.json()
      if(!response.ok)
      {
        return setMessage({text:result.message,type:"error"})
      }

      setMessage({text:result.message,type:"success"})
      setName("")
      setLocation("")
      setImageUrl("")
      navigate('/yourproperty')


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


  function handleAddProperty(){
    if(!name || !location || !image_url){
      setMessage({text:"All credentials are required",type:"error"})
      setTimeout(()=>{
        setMessage({text:"",type:"error"})
      },3000)
      return
    }

    addProperty()
  }

  return (
    <div className="min-h-screen bg-white px-6 pt-24 pb-10">
      <div className="max-w-md mx-auto border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Create</p>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-6">Add Property</h1>

        {message.text.length>0 && (
          <p className={`mb-4 text-sm ${message.type==="error"?"text-red-500":"text-gray-700"}`}>{message.text}</p>
        )}

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-700 mb-1">Name</p>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-gray-900" value={name} onChange={(e)=>setName(e.target.value)} type="text" />
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-1">Location</p>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-gray-900" value={location} onChange={(e)=>setLocation(e.target.value)} type="text" />
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-1">Image Url</p>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-gray-900" value={image_url} onChange={(e)=>setImageUrl(e.target.value)} type="text" />
          </div>
          <button className="w-full bg-black text-white rounded-lg py-2.5 disabled:opacity-60" disabled={loading} onClick={handleAddProperty}>{loading?"Adding...":"Add Property"}</button>
        </div>
      </div>
    </div>
  )
}

export default Addproperty