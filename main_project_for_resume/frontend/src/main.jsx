import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DoctorContextProvider } from './bodyUser/context.jsx'


createRoot(document.getElementById('root')).render(
  <DoctorContextProvider>
    <App></App>
  </DoctorContextProvider>
)
