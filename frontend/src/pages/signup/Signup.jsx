import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Signup.css"


const Signup = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        file: null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleFileChange = (e) => {
        setData({ ...data, file: e.target.files[0] });
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const usernameRegex = /^[a-z0-9._]+$/
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/


        if(! (data.username && data.email && data.password && data.cpassword ))
            return alert("Fill all Fields")

        if (!usernameRegex.test(data.username))
            return alert("Username must contain only lowercase letters, numbers, '.', and '_'. Must start with a letter.")
        
        if (!emailRegex.test(data.email))
            return alert("Enter a valid email address.")
        
        if (!passwordRegex.test(data.password))
            return alert("Password must be 8–12 characters with at least one uppercase letter, one lowercase letter, one number, and one special character.")
        

        if( data.password !== data.cpassword )
            return alert("Password does not match")

        try {
            const formdata = new FormData()
            formdata.append("username", data.username)
            formdata.append("email", data.email)
            formdata.append("password", data.password)

            if(data.file)
                formdata.append("file", data.file)

            const res = await axios.post("http://localhost:5000/api/blog/signup", formdata, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            })
            const resdata = res.data
            console.log(resdata.data)
            console.log(resdata.token)

            if(res.status === 201){
                localStorage.setItem("id", resdata.data._id)
                localStorage.setItem("token", resdata.token)
                navigate("/")
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='signup container'>
            <form onSubmit={handleSubmit}>
                <h1 style={{ textAlign: "center" }}>SignUp</h1>
                <input type="file" name="file" id="file" onChange={handleFileChange} />
                <input type="text" name="username" id="username" placeholder='Username' value={data.username} onChange={handleInputChange} />
                <input type="text" name="email" id="email" placeholder='Email' value={data.email} onChange={handleInputChange} />
                <input type="text" name="password" id="password" placeholder='Password' value={data.password} onChange={handleInputChange} />
                <input type="text" name="cpassword" id="cpassword" placeholder='Confirm Password' value={data.cpassword} onChange={handleInputChange} />
                <input type="submit" value="Submit" />
            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    )
}

export default Signup
