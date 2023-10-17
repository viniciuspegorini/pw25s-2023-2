import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserSignupPage } from './pages/UserSignupPage/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserSignupPage />
  </React.StrictMode>,
)
