import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import { useState } from "react"

function CommonArea () {
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    // setIsLoggedIn(false)    // test code
    
    return <>
        <Header />
        <div>
            <Outlet />
        </div>
        {/* <Nav /> */}
        {/* <Footer /> */}
        { isLoggedIn ? <Nav /> : <Footer /> }
    </>
}

export default CommonArea