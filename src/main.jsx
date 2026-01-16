import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 👇 把括号里的 ! 删掉
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)