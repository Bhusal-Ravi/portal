import { useNavigate } from "react-router-dom"

function ErrorFallback() {
  const navigate= useNavigate()
  return (
    <div className="min-h-screen bg-white px-6 pt-24 pb-10">
      <div className="max-w-md mx-auto border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Error</p>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-4">Something went wrong</h1>
        <p className="text-sm text-gray-600 mb-6">Please login and try again.</p>
        <button className="w-full bg-black text-white rounded-lg py-2.5" onClick={()=>navigate('/login')}>Go to Login</button>
      </div>
    </div>
  )
}

export default ErrorFallback