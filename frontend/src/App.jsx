import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Signup from './pages/signup/Signup.jsx'
import Login from './pages/login/Login.jsx'
import Navbar from './component/navbar/Navbar.jsx'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/signup' Component={Signup} />
          <Route path='/login' Component={Login} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
