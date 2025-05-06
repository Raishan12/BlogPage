import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Login = () => {

    const navigate = useNavigate()

    const [ data, setData ] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/
        if( ! (data.email && data.password) )
            return alert("Fill all fields")
        if (!emailRegex.test(data.email))
            return alert("Enter a valid email address.")
        if (!passwordRegex.test(data.password))
            return alert("Password must be 8–12 characters with at least one uppercase letter, one lowercase letter, one number, and one special character.")
        try {
            const res = await axios.post("http://localhost:5000/api/blog/login", data )
            console.log(res)
            const resdata = res.data
            if(res.status === 200){
                localStorage.setItem("token", resdata.token)
                localStorage.setItem("id", resdata.id)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" id="email" placeholder='Email' onChange={handleInputChange} />
                <input type="text" name="password" id="password" placeholder='Password' onChange={handleInputChange} />
                <input type="submit" value="Submit" />
            </form>
            <p>Don't have an account? <Link to={"/signup"}>Signup</Link></p>
        </div>
    )
}

export default Login