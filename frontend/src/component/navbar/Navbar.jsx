import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar conatainer'>
    <div className="title"><h1>BlogPage</h1></div>
    <div className="navigations">
        <div className="profilepicture">
        </div>
        <div className="dropdown">
            {/* <div className="profilebutton"><Link to={"/profile"}>Profile</Link> </div>
            <div className="logoutbutton"></div> */}
        </div>
    </div>
    </div>
  )
}

export default Navbar
