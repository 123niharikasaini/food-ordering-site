import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router/Router'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import {ContextReducer} from './components/ContextReducer'


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <ContextReducer>
     <RouterProvider router={router}/>
     </ContextReducer>
  </React.StrictMode>
)
