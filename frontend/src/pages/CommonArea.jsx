import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import { useState } from "react"

function CommonArea () {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    
    return <>
        <div className="mx-auto">
            <Header />
            <div>
                <Outlet />
            </div>
            {/* <Nav /> */}
            {/* <Footer /> */}
            { isLoggedIn ? <Nav /> : <Footer /> }
        </div>
    </>
}

export default CommonArea