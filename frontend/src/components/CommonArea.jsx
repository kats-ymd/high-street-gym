import { Outlet } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"
import Header from "./Header"
import Nav from "./Nav"
import Footer from "./Footer"

function CommonArea () {
    const [user, login, logout] = useAuthentication()

    // const loggedInUser = user ? "Logged in as: " + user.firstName + " " + user.lastName + " @" + user.role : "Not logged in yet!"
    const loggedInUser = user ? "G'day, " + user.firstName + "!" : "G'day, mate!"


    return <>
        <Header />
        <span className="text-red-600 mx-1">{loggedInUser}</span>
        <div className="pb-16"> {/* bottom padding to avoid main content from overlapping with bottom nav bar */}
            <Outlet />
        </div>
        {
            user ? <Nav /> : <Footer />
        }
    </>
}

export default CommonArea
