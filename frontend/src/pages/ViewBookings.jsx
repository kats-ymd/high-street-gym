import { useEffect, useState } from "react"
import { useAuthentication } from "../hooks/authentication"
import * as Bookings from "../api/bookings"
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
                setStatusMessage(results.message)
                setLoading(false)

                console.log(results.bookings)
                console.log(results.classes)
            })
            .catch((error) => {
                console.error("Error fetching bookings:", error)
                setStatusMessage("Error fetching bookings:" + error)
                setAllBookings([])
                setLoading(false)
            })
        }
    }, [user])

    function handleCancelOnClick (booking) {
        console.log(booking.booking_id)
        const deleteConfirmationMessage = `Are you sure to cancel this class?`
            + `\n\n${booking.activity_name}`
            + `\nwith ${booking.trainer_first_name} ${booking.trainer_last_name}`
            + `\n@${booking.location_name}`
            + `\non ${new Date(booking.class_date).toLocaleDateString()} ${booking.class_time}`

        if (window.confirm(deleteConfirmationMessage)) {
            Bookings.deleteByID(booking.booking_id, user.authenticationKey).then(result => {
                console.log(result)
                setStatusMessage(result.message)

                // refresh booking list after delete
                Bookings.getByUserID(user.id, user.authenticationKey).then(results => {
                    setAllBookings(results.bookings)
                    setAllClasses(results.classes)
                    // setStatusMessage(results.message)
                    setLoading(false)

                    console.log(results.bookings)
                    console.log(results.classes)
                })
                .catch((error) => {
                    console.error("Error fetching bookings:", error)
                    setStatusMessage("Error fetching bookings:" + error)
                    setAllBookings([])
                    setLoading(false)
                })
            })
            .catch((error) => {
                console.error("Failed to delete booking:", error)
                setStatusMessage("Failed to delete booking:" + error)
            })
        }
    }

    return loading ? <LoadingSpinner /> :
        allClasses ? <>
            <div className="flex flex-col">
                <h1 className="text-2xl">Your scheduled classes as trainer:</h1>
                {allClasses.map((eachBooking) =>
                    <div key={eachBooking.class_id} className="border-t-2 border-dashed border-gray-400 py-2">
                        <div className="flex justify-between">
                            <span className="">{eachBooking.activity_name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>@{eachBooking.location_name}</span>
                            <span>on {new Date(eachBooking.class_date).toLocaleDateString()} {eachBooking.class_time}</span>
                        </div>
                    </div>
                )}
            </div>
        </>
        : !allBookings ? <>
            <div className="text-2xl">You have no classes booked yet!</div>
        </>
        : <>
            <div className="flex flex-col">
                <h1 className="text-2xl">Your current class bookings:</h1>
                <span className="label-text-alt">{statusMessage}</span>
                {allBookings.map((eachBooking) =>
                    <div key={eachBooking.booking_id} className="border-t-2 border-dashed border-gray-400 py-2">
                        <div className="flex justify-between">
                            <span className="basis-1/3">{eachBooking.activity_name}</span>
                            <span className="basis-1/3">with {eachBooking.trainer_first_name} {eachBooking.trainer_last_name}</span>
                            <button
                                onClick={() => handleCancelOnClick(eachBooking)}
                                className="basis-1/3 text-end text-red-600"
                            >
                                Cancel X
                            </button>
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
