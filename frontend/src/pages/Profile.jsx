import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

function Profile () {
    return <>
    <div className="mx-auto">
        <Header />
        <div className="w-5/6">
            <img src="https://picsum.photos/100/100" alt="logo image placeholder" className="my-4 mx-auto rotate-45" />
            <h1>This is the profile page!</h1>
            <form className="flex flex-col gap-y-2">
                <input type="text" placeholder="First Name" className="input input-bordered" />
                <input type="text" placeholder="Last Name" className="input input-bordered" />
                <input type="tel" placeholder="Phone Number" className="input input-bordered" />
                <input type="text" placeholder="Address" className="input input-bordered" />
                <input type="email" placeholder="Email" className="input input-bordered" />
                <input type="text" placeholder="Password" className="input input-bordered" />
                <div>
                    <button className="btn">Save</button>
                    <Link to="/" className="btn btn-ghost">Cancel</Link>
                </div>
            </form>
        </div>
        <Nav />
    </div>
</>
}

export default Profile