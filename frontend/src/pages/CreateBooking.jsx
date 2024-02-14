// import Header from "../components/Header"
// import Nav from "../components/Nav"
// import Footer from "../components/Footer"
import { Link } from "react-router-dom"

function CreateBooking () {
    return <>
        {/* <Header /> */}
        <h1>This is the Class Booking page!</h1>
        <p>Activity</p>
        <span>day - month</span>
        <form className="flex flex-col gap-y-2">
            <select className="select select-bordered">
                <option disabled selected>Available Time</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
            <select className="select select-bordered">
                <option disabled selected>Available Trainser</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
            <select className="select select-bordered">
                <option disabled selected>Location</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
            <div>
                <button className="btn">Book</button>
                <Link to="/timetable" className="btn btn-ghost">Back</Link>
            </div>
        </form>
        {/* <Nav /> */}
        {/* <Footer /> */}
    </>
}

export default CreateBooking