import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FirstPage from './firstPage.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirstPage />
    <Toaster />
  </StrictMode>,
)
