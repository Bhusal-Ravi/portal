
import { useNavigate } from "react-router-dom"

function Pagenotfound() {
   const navigate= useNavigate()
   return (
      <main className="min-h-screen bg-white px-6 pt-24 pb-10">
        <div className="max-w-md mx-auto border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
          <p className="text-sm font-semibold text-gray-500">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900">
            Page not found
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            Sorry, we could not find the page you are looking for.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <button className="w-full bg-black text-white rounded-lg py-2.5" onClick={()=>navigate('/')}>Return Home</button>
          </div>
        </div>
      </main>
  )
}

export default Pagenotfound