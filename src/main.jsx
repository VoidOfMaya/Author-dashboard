import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import { LoginPage } from './Components/login/loginPage.jsx'
import { NotFound } from './Components/404-page/notFound.jsx'
import { Dashboard } from './Components/dashboard/dashboard.jsx'


const router =createBrowserRouter([
  { path: '/', element:<App />,
    children: [
    { path: '/', element: <LoginPage/>},
    {path:'/dashboard', element: <Dashboard />},
    //{path:'/createPost', element: <create />}

    ],
    errorElement:<NotFound />},

  //otherpages go here
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
