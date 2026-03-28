import { useEffect, useState } from "react"
import { HeartPlus } from 'lucide-react';
import { useNavigate } from "react-router-dom";
const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000"
import type { Properties_Type } from '../../types/properties_types'
import { ToastContainer, toast } from 'react-toastify';

function Properties() {
    const LIMIT = 10
    const [properties, setProperties] = useState<Properties_Type[]>([])
    
    const [loading, setLoading] = useState(false)
    const [favloading,setFavLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [offset, setOffset] = useState(0)
    const navigate= useNavigate()

    async function getProperties(nextOffset: number) {
        if (loading || !hasMore) return
        setLoading(true)
        try {
            const response = await fetch(`${base_url}/api/propertylist?offset=${nextOffset}&limit=${LIMIT}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include"
            })

            const result = await response.json()
            console.log(result)
            if (!response.ok){ 
                if(response.status===401){
                    toast.error(result.message)
                
                    navigate('/notauthorized')
                    
                }
                  toast.error(result.message)}
            
               

            const nextRows: Properties_Type[] = Array.isArray(result.data) ? result.data : []
             if (nextRows.length === 0) {
                console.log(hasMore)
                setHasMore(false)
                return
                }
            if (nextRows.length < LIMIT) setHasMore(false)
            setProperties((prev) => [...prev, ...nextRows])
            setOffset((prev) => prev + nextRows.length)

        } catch (error) {
            console.log(error)
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProperties(0)
    }, [])

    useEffect(() => {
        function handleScroll() {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150
            if (nearBottom && !loading && hasMore) {
                getProperties(offset)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [offset, loading, hasMore])

   async function handleFavourite(id:string,favourite:boolean){
        try{
            const option= favourite ?"delete":"add"  
            setFavLoading(true)
            const response= await fetch(`${base_url}/api/favourite/${option}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify({id:id})

            })
            const result= await response.json()
            console.log(result)
            if(!response.ok){
                if(response.status===401){
                    toast.error(result.message , {
                                    position: "top-right",
                                    autoClose: 1500,
                                    hideProgressBar: true,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                  
                                    });
                    setTimeout(()=>{
                        navigate('/login')
                    },800)
                    return
                }
                return toast.error(result.message , {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              
                                });
            }
             setProperties((prev)=>
            prev.map(item=>
                item.id===id
                ?{...item,favourite:!item.favourite}
                :item
            )
        )

        toast.success(result.message , {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              
                                });

        }catch(error){
            console.log(error)
        }finally {
            setFavLoading(false)
        }


       
    }

    return (
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-20">
                                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    
                    />
            <div className="mb-10">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Explore</p>
                <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Properties</h1>
            </div>

            

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((item, index) => (
                    <div
                        key={item.id + item.created_at + index}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="relative overflow-hidden h-52">
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 z-10 flex flex-row right-2  group">
                                <div className="bg-black opacity-70 hidden transform-all duration-200 group-hover:block cursor-pointer px-2 py-1 rounded-sm mr-2">
                                    <p className="text-white">{item.favourite===false?"Add to favourite":"Remove from favourite"}</p>
                                </div>
                                <button disabled={favloading} onClick={()=>handleFavourite(item.id,item.favourite)}><HeartPlus className={`mr-1 ${item.favourite===true?"fill-red-500":''}  group-hover:scale-120 transform-all duration-200 cursor-pointer bg-white rounded-full h-7 w-7 p-1`}/></button>
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                            <span className="absolute bottom-3 left-3 text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                {item.location}
                            </span>
                        </div>

                        <div className="p-4">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">{item.name}</h2>

                            <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-500">
                                    Owner: <span className="text-gray-800 font-medium">{item.username}</span>
                                </p>
                                <span className="text-xs text-gray-400">
                                    {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {loading && (
                <div className="flex justify-center py-12">
                    <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                </div>
            )}

            {!hasMore && !loading && (
                <p className="text-center text-xs text-gray-400 py-12 tracking-widest uppercase">
                    No more properties
                </p>
            )}
        </div>
    )
}

export default Properties