import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { AuthenticationProvider } from './hooks/authentication.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationProvider router={router}>
      <RouterProvider router={router} />
    </AuthenticationProvider>
  </React.StrictMode>
)
