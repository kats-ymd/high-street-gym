import { createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Timetable from "./pages/Timetable"
import XmlImport from "./pages/XmlImport"
import Blog from "./pages/Blog"
import Signup from "./pages/Signup"
import CreateBooking from "./pages/CreateBooking"
import ViewBookings from "./pages/ViewBookings"
import Profile from "./pages/Profile"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/timetable",
        element: <Timetable />
    },
    {
        path: "/bookings",
        element: <ViewBookings />
    },
    {
        path: "/createBooking",
        element: <CreateBooking />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/import",
        element: <XmlImport />
    },
    {
        path: "/blog",
        element: <Blog />
    },
    {
        path: "/signup",
        element: <Signup />
    }
])

export default router