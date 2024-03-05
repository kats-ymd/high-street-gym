import { NavLink, useNavigate } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"
import timetable from "../assets/img/iconmonstr-calendar-4.svg"
import bookings from "../assets/img/iconmonstr-list-lined.svg"
import blog from "../assets/img/iconmonstr-script-5.svg"
import profile from "../assets/img/iconmonstr-user-circle-thin.svg"
import upload from "../assets/img/iconmonstr-upload-18.svg"
import logoutIcon from "../assets/img/iconmonstr-log-out-16.svg"

function Nav() {
    const [user, login, logout] = useAuthentication()
    const navigate = useNavigate()

    // Define logout procedure
    function onLogoutClick(e) {
        logout()
        navigate("/")
    }

    return <nav className="btm-nav">
        <NavLink to="/timetable" // className="btn-ghost"
            // className={({isActive}) => isActive ? "active" : ""}
            // without className prop, it still works
            // because <NavLink> by default add/remove class="active"
        >
            <img src={timetable} alt="timetable icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">Timetable</span>
        </NavLink>
        <NavLink to="/bookings" // className="btn-ghost"
            // className={({isActive}) => isActive ? "active" : ""}
        >
            <img src={bookings} alt="booking list icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">Bookings</span>
        </NavLink>
        <NavLink to="/blog" // className="btn-ghost"
            // className={({isActive}) => isActive ? "active" : ""}
        >
            <img src={blog} alt="blog icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">Blog</span>
        </NavLink>
        <NavLink to="/profile" // className="btn-ghost"
            // className={({isActive}) => isActive ? "active" : ""}
        >
            <img src={profile} alt="person torso icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">Profile</span>
        </NavLink>

        {
            user && (user.role == "admin" || user.role == "trainer")
            // user && (user.role == "trainer") // test code to see if it disappears
                ? <NavLink to="/import" // className="btn-ghost"
                    // className={({isActive}) => isActive ? "active" : ""}
                >
                    <img src={upload} alt="file uploading icon" className="h-5 w-5" />
                    <span className="btm-nav-label text-xs text-center">XML Import</span>
                </NavLink>
                : <></>
        }

        <a onClick={onLogoutClick}>
            <img src={logoutIcon} alt="exit from door icon" className="h-5 w-5" />
            <span className="btm-nav-label text-xs text-center">Logout</span>
        </a>
    </nav>
}

export default Nav