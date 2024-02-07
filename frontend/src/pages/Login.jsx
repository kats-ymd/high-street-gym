// import Header from "../components/Header"
// import Nav from "../components/Nav"
// import Footer from "../components/Footer"
import { Link } from "react-router-dom"

function Login() {
    return <>
        <div className="mx-auto">
            {/* <Header /> */}
            <div>
                <img src="https://picsum.photos/100/100" alt="logo image placeholder" className="my-4 mx-auto rotate-45" />
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
        </div>
    </>
}

export default Login