import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import ErrorFallback from './components/ErrorFallback.tsx';
import Pagenotfound from './components/Pagenotfound.tsx';
import Layout from './components/Layout.tsx';
import Login from './components/Login.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:<ErrorFallback/>,
    children: [
      {
        index: true,
        element: <Layout />,
      },
    ],
  },
  {path:'*',
  element:<Pagenotfound/>
  },
  {
    path:'/login',
    element:<Login/>
  }

   
 
 

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router}/>
  </StrictMode>,
)


