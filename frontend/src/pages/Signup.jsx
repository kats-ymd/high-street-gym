import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Users from "../api/users"
import { useAuthentication } from "../hooks/authentication"
import profile from "../assets/img/iconmonstr-user-circle-thin.svg"

function Signup () {
    const navigate = useNavigate()

    const [, login, , ] = useAuthentication()

    // initialize the input fields
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        email: "",
        password: "",
    })

    const [statusMessage, setStatusMessage] = useState("")

    // Clears the currently loaded user data from the form
    function clear() {
        setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            email: "",
            password: "",
        })
        setStatusMessage("")
    }

    function onSignupSubmit(e) {
        e.preventDefault()
        setStatusMessage("Signing up...")

        // if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(formData.email)) {
        //     setStatusMessage("Invalid email address")
        //     return
        // }

        // Register then attempt login
        Users.registerUser(formData)
            .then(result => {
                setStatusMessage(result.message)
                // login(formData.email, formData.password)
                //     .then(result => {
                //         setStatusMessage(result.message)
                //         navigate("/profile")
                //     })
                //     .catch(error => {
                //         setStatusMessage("Login failed: " + error)
                //     })
            })
    }

    return <>
        <div className="mx-4">
            {/* <h1 className="text-2xl">Sign Up</h1> */}
            <img
                src={profile}
                alt="user image placeholder"
                className="w-40 my-4 mx-auto"
            />
            <form
                className="flex flex-col gap-y-2 px-2"
                onSubmit={onSignupSubmit}
            >
                <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered"
                    value={formData.firstName}
                    onChange={(e) => setFormData(existing => { return { ...existing, firstName: e.target.value } })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered"
                    value={formData.lastName}
                    onChange={(e) => setFormData(existing => { return { ...existing, lastName: e.target.value } })}
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    className="input input-bordered"
                    value={formData.phone}
                    onChange={(e) => setFormData(existing => { return { ...existing, phone: e.target.value } })}
                />
                <input
                    type="text"
                    placeholder="Address"
                    className="input input-bordered"
                    value={formData.address}
                    onChange={(e) => setFormData(existing => { return { ...existing, address: e.target.value } })}
                />
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
                <div className="flex flex-wrap">
                    <button className="basis-1/2 btn">Sign Up!</button>
                    <button
                        onClick={() => navigate("/")}
                        className="basis-1/2 btn btn-ghost"
                    >Login</button>
                </div>
                <label className="label">
                    <span className="text-base text-red-600">{statusMessage}</span>
                </label>
            </form>
        </div>
    </>
}

export default Signup
