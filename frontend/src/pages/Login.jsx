// import Header from "../components/Header"
// import Nav from "../components/Nav"
// import Footer from "../components/Footer"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"
import logo from "../assets/img/hs-high-resolution-logo-transparent.svg"

function Login() {
    const navigate = useNavigate()

    const [user, login, logout] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    function onLoginSubmit(e) {
        e.preventDefault()
        setStatusMessage("Logging in...")

        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(formData.email)) {
            setStatusMessage("Invalid email address")
            return
        }

        login(formData.email, formData.password)
            .then(result => {
                setStatusMessage("Login successful!")
                navigate("/bookings")
            })
            .catch(error => {
                setStatusMessage("Login failed: " + error)
            })
    }

    return <>
        {/* <Header /> */}
        <div>
            <img src={logo} alt="logo image" className="w-40 my-4 mx-auto" />
            <h1>This is the login page!</h1>
            <form className="flex flex-col gap-y-2" onSubmit={onLoginSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="input input-bordered" 
                    value={formData.email} 
                    onChange={(e) => setFormData(existing => { return { ...existing, email: e.target.value } })}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="input input-bordered" 
                    value={formData.password}
                    onChange={(e) => setFormData(existing => { return { ...existing, password: e.target.value } })}
                />
                <div>
                    <button className="btn">Login</button>
                    <Link to="/signup" className="btn btn-ghost">Signup</Link>
                </div>
                <span>{statusMessage}</span>
            </form>
        </div>
        {/* <Footer /> */}
    </>
}

export default Login