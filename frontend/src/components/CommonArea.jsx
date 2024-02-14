import Header from "./Header"
import Nav from "./Nav"
import Footer from "./Footer"
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