import { useEffect, useState } from "react"
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

        // // input validation
        // if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(formData.email)) {
        //     setStatusMessage("Invalid email address")
        //     return
        // }
        // if (!/^[^\s]+$/.test(formData.password)) {
        //     setStatusMessage("Invalid password: it cannot be empty or contain spaces")
        //     return
        // }

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
        <div className="mx-4">
            {/* <h1 className="text-2xl">This is the login page!</h1> */}
            <img src={logo} alt="logo image" className="w-40 my-4 mx-auto" />
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
                <div className="flex flex-wrap">
                    <button className="btn flex-grow">Login</button>
                    <Link to="/signup" className="btn btn-ghost flex-grow">Signup</Link>
                </div>
                <span className="text-base text-red-600">{statusMessage}</span>

                {/* Following section is included for debugging and development purposes */}
                {/* <div className="bg-pink-200 rounded-xl mt-8">
                    <h2>DEV ONLY - Quick Login</h2>
                    <table className="table table-compact w-full">
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>email</th>
                                <th>password</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>admin</td>
                                <td>admin@trials.net</td>
                                <td>abc123</td>
                                <td>
                                    <button
                                        className="btn btn-xs btn-primary"
                                        onClick={() => {
                                            login("admin@trials.net", "abc123")
                                                .then(result => {
                                                    setStatusMessage("Login successful!")
                                                    navigate("/bookings")
                                                })
                                                .catch(error => {
                                                    setStatusMessage("Login failed: " + error)
                                                })
                                        }}>Login</button>
                                </td>
                            </tr>
                            <tr>
                                <td>trainer</td>
                                <td>trainer@trials.net</td>
                                <td>abc123</td>
                                <td>
                                    <button
                                        className="btn btn-xs btn-primary"
                                        onClick={() => {
                                            login("trainer@trials.net", "abc123")
                                                .then(result => {
                                                    setStatusMessage("Login successful!")
                                                    navigate("/bookings")
                                                })
                                                .catch(error => {
                                                    setStatusMessage("Login failed: " + error)
                                                })
                                        }}>Login</button>
                                </td>
                            </tr>
                            <tr>
                                <td>customer</td>
                                <td>customer@trials.net</td>
                                <td>abc123</td>
                                <td>
                                    <button
                                        className="btn btn-xs btn-primary"
                                        onClick={() => {
                                            login("customer@trials.net", "abc123")
                                                .then(result => {
                                                    setStatusMessage("Login successful!")
                                                    navigate("/bookings")
                                                })
                                                .catch(error => {
                                                    setStatusMessage("Login failed: " + error)
                                                })
                                        }}>Login</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
            </form>
        </div>
    </>
}

export default Login
