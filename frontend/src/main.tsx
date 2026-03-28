
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import ErrorFallback from './components/ErrorFallback.tsx';
import Pagenotfound from './components/Pagenotfound.tsx';
import Layout from './components/Layout.tsx';
import Login from './components/Login.tsx';
import Signup from './components/Signup.tsx';
import Addproperty from './components/Addproperty.tsx';
import Favourites from './components/Favourites.tsx';
import Yourproperty from './components/Yourproperty.tsx';
import NotAuthorized from './components/NotAuthorized.tsx';


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
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
        path:'notauthorized',
        element:<NotAuthorized/>
      }

   
 
 

])

createRoot(document.getElementById('root')!).render(
  
     <RouterProvider router={router}/>
  
)


