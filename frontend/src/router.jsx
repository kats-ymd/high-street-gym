import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import { RestrictedRoute } from "./components/RestrictedRoute"
import Login from "./pages/Login"
import Timetable from "./pages/Timetable"
import XmlImport from "./pages/XmlImport"
import ReferenceList from "./pages/ReferenceList"
import Blog from "./pages/Blog"
import Signup from "./pages/Signup"
import CreateBooking from "./pages/CreateBooking"
import ViewBookings from "./pages/ViewBookings"
import Profile from "./pages/Profile"
import CommonArea from "./components/CommonArea"

// nested routing for using <Outlet />
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={<CommonArea />}>
                <Route path='' element={<Login />}></Route>
                <Route path='signup' element={<Signup />}></Route>
                <Route path='timetable' element={<Timetable />}></Route>
                <Route path='bookings' element={<ViewBookings />}></Route>
                <Route path='createBooking/:activityID' element={<CreateBooking />}></Route>
                <Route path='profile' element={<Profile />}></Route>
                <Route path='import' element={
                    <RestrictedRoute allowedRoles={["admin", "trainer"]}>
                        <XmlImport />
                    </RestrictedRoute>
                }></Route>
                <Route path='referenceList' element={
                    <RestrictedRoute allowedRoles={["admin", "trainer"]}>
                        <ReferenceList />
                    </RestrictedRoute>
                }></Route>
                <Route path='blog' element={<Blog />}></Route>
            </Route>
        </Route>
    )
)

// // routing explained in class / reference project
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Login />
//     },
//     {
//         path: "/timetable",
//         element: <Timetable />
//     },
//     {
//         path: "/bookings",
//         element: <ViewBookings />
//     },
//     {
//         path: "/createBooking",
//         element: <CreateBooking />
//     },
//     {
//         path: "/profile",
//         element: <Profile />
//     },
//     {
//         path: "/import",
//         element: <XmlImport />
//     },
//     {
//         path: "/blog",
//         element: <Blog />
//     },
//     {
//         path: "/signup",
//         element: <Signup />
//     }
// ])

export default router
