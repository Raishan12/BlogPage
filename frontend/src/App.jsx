import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Signup from './pages/signup/Signup.jsx'
import Login from './pages/login/Login.jsx'
import Navbar from './component/navbar/Navbar.jsx'
import Profile from './pages/profile/Profile.jsx'
import Uploadblog from './pages/uploadblog/Uploadblog.jsx'
import Userblog from './pages/userblog/Userblog.jsx'
import Editprofile from './pages/editprofile/Editprofile.jsx'

const App = () => {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/signup' Component={Signup} />
          <Route path='/login' Component={Login} />
          <Route path="profile" element={<Profile />}>
            <Route path="blogs" element={<Userblog />} />
            <Route path="upload" element={<Uploadblog />} />
            <Route path="edit" element={<Editprofile />} />
          </Route>

          {/* <Route path='/upload' Component={Uploadblog} /> */}

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
