import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000"
import type { User_Types } from '../../types/user_types'
import { Menu, X, Home, Heart, PlusSquare } from 'lucide-react'

function Navbar() {
  const [user, setUser] = useState<User_Types>()
  const [sidebar, setSidebar] = useState(false)
  const navigate = useNavigate()

  async function getUser() {
    try {
      const response = await fetch(`${base_url}/api/user`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const result = await response.json()
      if (!response.ok) return
      setUser(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getUser() }, [])

  function go(path: string) {
    navigate(path)
    setSidebar(false)
  }

  return (
    <>
      {sidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setSidebar(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-900">Menu</span>
          <button onClick={() => setSidebar(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col p-3 mt-1">
          <button onClick={() => go('/yourproperty')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors text-left">
            <Home size={15} className="text-gray-400" />
            Your Properties
          </button>
          <button onClick={() => go('/favourites')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors text-left">
            <Heart size={15} className="text-gray-400" />
            Favourites
          </button>
          <button onClick={() => go('/addproperty')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors text-left">
            <PlusSquare size={15} className="text-gray-400" />
            Add Property
          </button>
        </div>

        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
          </div>
        )}
      </div>

      <div className="fixed top-0 z-30 w-full bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebar(prev => !prev)} className="text-gray-400 hover:text-gray-900 transition-colors">
              <Menu size={20} />
            </button>
            <button onClick={()=>navigate('/')}><h1 className="text-sm font-semibold text-gray-900">Assignment</h1></button>
          </div>

          {user && (
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar