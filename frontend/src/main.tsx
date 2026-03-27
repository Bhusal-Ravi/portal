import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import ErrorFallback from './components/ErrorFallback.tsx';
import Pagenotfound from './components/Pagenotfound.tsx';
import Layout from './components/Layout.tsx';
import Login from './components/Login.tsx';
import Addproperty from './components/Addproperty.tsx';
import Favourites from './components/Favourites.tsx';
import Yourproperty from './components/Yourproperty.tsx';


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
      {
        path: 'yourproperty',
        element: <Yourproperty />,
      },
      {
        path: 'favourites',
        element: <Favourites />,
      },
      {
        path: 'addproperty',
        element: <Addproperty />,
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


