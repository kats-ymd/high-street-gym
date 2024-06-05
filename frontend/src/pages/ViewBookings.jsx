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
            <div className="mx-1">
                <h1 className="text-2xl pb-2">Your scheduled classes as trainer:</h1>
                <div className="flex flex-col">
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
            </div>
        </>
        : !allBookings ? <>
            <div className="text-2xl pb-2">You have no classes booked yet!</div>
        </>
        : <>
            <div className="mx-1">
                <h1 className="text-2xl pb-2">Your current class bookings:</h1>
                <div className="flex flex-col px-1">
                    {/* <span className="text-base text-red-600">{statusMessage}</span> */}
                    {allBookings.map((eachBooking) =>
                        <div key={eachBooking.booking_id} className="border-t-2 border-dashed border-gray-400 py-2">
                            <div className="flex justify-between items-center">
                                <span className="basis-2/5 text-2xl">
                                    {eachBooking.activity_name}
                                </span>
                                <span className="basis-2/5">
                                    with {eachBooking.trainer_first_name} {eachBooking.trainer_last_name}
                                </span>
                                <div className="basis-1/5 text-end">
                                    <button
                                        onClick={() => handleCancelOnClick(eachBooking)}
                                        className="btn-ghost text-red-600 px-1 rounded-md"
                                    >
                                        Cancel X
                                    </button>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="basis-2/5">@{eachBooking.location_name}</span>
                                <span className="basis-2/5">on {new Date(eachBooking.class_date).toLocaleDateString()} {eachBooking.class_time.slice(0, -3)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
}

export default ViewBookings
