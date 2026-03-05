import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import { LoginPage } from './Components/login/loginPage.jsx'
import { NotFound } from './Components/404-page/notFound.jsx'


const router =createBrowserRouter([
  { path: '/', element:<App />,
    children: [
    { path: '/', element: <LoginPage/>},

    ],
    errorElement:<NotFound />},

  //otherpages go here
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
