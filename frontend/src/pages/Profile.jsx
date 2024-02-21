// import Header from "../components/Header"
// import Nav from "../components/Nav"
// import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import profile from "../assets/img/iconmonstr-user-circle-thin.svg"

function Profile () {
    return <>
        {/* <Header /> */}
        <div>
            <img src={profile} alt="user image placeholder" className="w-40 my-4 mx-auto" />
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
        {/* <Nav /> */}
        {/* <Footer /> */}
    </>
}

export default Profile