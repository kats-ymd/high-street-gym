import { useEffect, useState } from "react"
import { useAuthentication } from "../hooks/authentication"
import * as Bookings from "../api/bookings"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

function ViewBookings () {
    const [user, , , ] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    // Load classes
    const [allBookings, setAllBookings] = useState([])
    const [allClasses, setAllClasses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            Bookings.getByUserID(user.id, user.authenticationKey).then(results => {
                setAllBookings(results.bookings)
                setAllClasses(results.classes)
                setLoading(false)

                console.log(results.bookings)
                console.log(results.classes)
            })
            .catch((error) => {
                console.error("Error fetching bookings:", error)
                setAllBookings([])
                setLoading(false)
            })
        }
    }, [user])

    return loading ? <LoadingSpinner /> :
        allClasses ? <>
            <div className="flex flex-col">
                <h1>Your scheduled classes:</h1>
                {allClasses.map((eachBooking) =>
                    <div key={eachBooking.class_id} className="border border-black py-2">
                        <div className="flex justify-between">
                            <span className="">{eachBooking.activity_name}</span>
                            <span className="">as trainer</span>
                            <span></span>
                        </div>
                        <div className="flex justify-between">
                            <span>@{eachBooking.location_name}</span>
                            <span>on {new Date(eachBooking.class_date).toLocaleDateString()} {eachBooking.class_time}</span>
                        </div>
                    </div>
                )}
            </div>
        </> :
        !allBookings ? <>You have no classes booked yet!</> :
        <>
            <div className="flex flex-col">
                <h1>Your current class bookings:</h1>
                {allBookings.map((eachBooking) =>
                    <div key={eachBooking.booking_id} className="border border-black py-2">
                        <div className="flex justify-between">
                            <span className="">{eachBooking.activity_name}</span>
                            <span className="">with {eachBooking.trainer_first_name} {eachBooking.trainer_last_name}</span>
                            <span></span>
                        </div>
                        <div className="flex justify-between">
                            <span>@{eachBooking.location_name}</span>
                            <span>on {new Date(eachBooking.class_date).toLocaleDateString()} {eachBooking.class_time}</span>
                        </div>
                    </div>
                )}
            </div>
        </>
}

export default ViewBookings
