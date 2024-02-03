import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

function ViewBookings () {
    return <>
        <div className="mx-auto">
            <Header />
            <div className="w-5/6">
                <h1>This is the booking view page!</h1>
            </div>
            <Nav />
        </div>
    </>
}

export default ViewBookings