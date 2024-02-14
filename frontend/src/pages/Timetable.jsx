// import Header from "../components/Header"
// import Nav from "../components/Nav"
// import Footer from "../components/Footer"
import { Link } from "react-router-dom"

function Timetable () {
    return <>
        {/* <Header /> */}
        <div className="flex flex-col">
            <h1>This is the Timetable page!</h1>
            <span className="border border-black">Monday</span>
            <div className="columns-2 flex justify-between">
                <span>HIIT</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <div className="columns-2 flex justify-between">
                <span>Yoga</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <div className="columns-2 flex justify-between">
                <span>Boxing</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <span className="border border-black">Tuesday</span>
            <div className="columns-2 flex justify-between">
                <span>Pilates</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <div className="columns-2 flex justify-between">
                <span>Yoga</span>
                <Link to="/createBooking">Book &gt;</Link>
                </div>
            <div className="columns-2 flex justify-between">
                <span>Aquacise</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <span className="border border-black">Wednesday</span>
            <div className="columns-2 flex justify-between">
                <span>HIIT</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <div className="columns-2 flex justify-between">
                <span>Yoga</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <div className="columns-2 flex justify-between">
                <span>Boxing</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <span className="border border-black">Thursday</span>
            <div className="columns-2 flex justify-between">
                <span>Pilates</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <div className="columns-2 flex justify-between">
                <span>Yoga</span>
                <Link to="/createBooking">Book &gt;</Link>
                </div>
            <div className="columns-2 flex justify-between">
                <span>Aquacise</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <span className="border border-black">Friday</span>
            <div className="columns-2 flex justify-between">
                <span>HIIT</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <div className="columns-2 flex justify-between">
                <span>Yoga</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <div className="columns-2 flex justify-between">
                <span>Boxing</span>
                <Link to="/createBooking">Book &gt;</Link>
            </div>
            <span className="border border-black">Saturday</span>
            <span className="border border-black">Sunday</span>
            {/* <Nav /> */}
            {/* <Footer /> */}
        </div>
    </>
}

export default Timetable