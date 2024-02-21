// import Header from "../components/Header"
// import Nav from "../components/Nav"
// import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import logo from "../assets/img/hs-high-resolution-logo-transparent.svg"

function Login() {
    return <>
        {/* <Header /> */}
        <div>
            <img src={logo} alt="logo image" className="w-40 my-4 mx-auto" />
            <h1>This is the login page!</h1>
            <form className="flex flex-col gap-y-2">
                <input type="email" placeholder="Email" className="input input-bordered" />
                <input type="text" placeholder="Password" className="input input-bordered" />
                <div>
                    <button className="btn">Login</button>
                    <Link to="/signup" className="btn btn-ghost">Signup</Link>
                </div>
            </form>
        </div>
        {/* <Footer /> */}
    </>
}

export default Login