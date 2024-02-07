import { Link } from "react-router-dom"
import timetable from "../assets/img/iconmonstr-calendar-4.svg"
import bookings from "../assets/img/iconmonstr-list-lined.svg"
import blog from "../assets/img/iconmonstr-script-5.svg"
import profile from "../assets/img/iconmonstr-user-circle-thin.svg"
import upload from "../assets/img/iconmonstr-upload-18.svg"
import logout from "../assets/img/iconmonstr-log-out-16.svg"

function Nav() {
    return <nav className="btm-nav">
        <Link to="/timetable" className="active">
            <img src={timetable} alt="timetable icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">Timetable</span>
        </Link>
        <Link to="/bookings">
            <img src={bookings} alt="booking list icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">Bookings</span>
        </Link>
        <Link to="/blog">
            <img src={blog} alt="blog icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">Blog</span>
        </Link>
        <Link to="/profile">
            <img src={profile} alt="person torso icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">Profile</span>
        </Link>
        <Link to="/import" className="disabled">
            <img src={upload} alt="file uploading icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">XML Import</span>
        </Link>
        <Link to="/">
            <img src={logout} alt="exit from door icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">Logout</span>
        </Link>
    </nav>

    // return <div className="btm-nav">
    //     <button>
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    //     <span className="btm-nav-label">Home</span>
    //     </button>
    //     <button className="active">
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    //     <span className="btm-nav-label">Warnings</span>
    //     </button>
    //     <button>
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    //     <span className="btm-nav-label">Statics</span>
    //     </button>
    // </div>
}

export default Nav