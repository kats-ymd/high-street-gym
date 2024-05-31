import { useEffect, useState } from "react"
import { useAuthentication } from "../hooks/authentication"
import * as Activities from "../api/activities"
import * as Locations from "../api/locations"
import * as Users from "../api/users"
import LoadingSpinner from "../components/LoadingSpinner"

function ReferenceList () {
    const [user, , , ] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")
    const [loading, setLoading] = useState(true)

    // Load activities
    const [allActivities, setAllActivities] = useState([])
    useEffect(() => {
        if (user) {
            Activities.getAll(user.authenticationKey).then(results => {
                setAllActivities(results.activity)
                setStatusMessage(results.message)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching activities:", error)
                setStatusMessage("Error fetching activities:" + error)
                setAllActivities([])
                setLoading(false)
            })
        }
    }, [user])

    // Load locations
    const [allLocations, setAllLocations] = useState([])
    useEffect(() => {
        if (user) {
            Locations.getAll(user.authenticationKey).then(results => {
                setAllLocations(results.location)
                setStatusMessage(results.message)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching locations:", error)
                setStatusMessage("Error fetching locations:" + error)
                setAllActivities([])
                setLoading(false)
            })
        }
    }, [user])

    // Load trainers
    const [allTrainers, setAllTrainers] = useState([])
    useEffect(() => {
        if (user) {
            Users.getByRole("trainer", user.authenticationKey).then(results => {
                setAllTrainers(results.user)
                setStatusMessage(results.message)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching bookings:", error)
                setStatusMessage("Error fetching bookings:" + error)
                setAllTrainers([])
                setLoading(false)
            })
        }
    }, [user])

    useEffect(() => {
        if (allTrainers.length > 0) {
            console.log(allTrainers)
        }
        if (allActivities.length > 0) {
            console.log(allActivities)
        }
        if (allLocations.length > 0) {
            console.log(allLocations)
        }
    }, [allTrainers, allActivities, allLocations])

    // function handleCancelOnClick (booking) {
    //     console.log(booking.booking_id)
    //     const deleteConfirmationMessage = `Are you sure to cancel this class?`
    //         + `\n\n${booking.activity_name}`
    //         + `\nwith ${booking.trainer_first_name} ${booking.trainer_last_name}`
    //         + `\n@${booking.location_name}`
    //         + `\non ${new Date(booking.class_date).toLocaleDateString()} ${booking.class_time}`

    //     if (window.confirm(deleteConfirmationMessage)) {
    //         Bookings.deleteByID(booking.booking_id, user.authenticationKey).then(result => {
    //             console.log(result)
    //             setStatusMessage(result.message)

    //             // refresh booking list after delete
    //             Bookings.getByUserID(user.id, user.authenticationKey).then(results => {
    //                 setAllBookings(results.bookings)
    //                 setAllClasses(results.classes)
    //                 // setStatusMessage(results.message)
    //                 setLoading(false)

    //                 console.log(results.bookings)
    //                 console.log(results.classes)
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching bookings:", error)
    //                 setStatusMessage("Error fetching bookings:" + error)
    //                 setAllBookings([])
    //                 setLoading(false)
    //             })
    //         })
    //         .catch((error) => {
    //             console.error("Failed to delete booking:", error)
    //             setStatusMessage("Failed to delete booking:" + error)
    //         })
    //     }
    // }

    return loading ? <LoadingSpinner /> :
        <>
            <div className="flex flex-col">
                <h1 className="text-2xl">Reference List</h1>

                <h2 className="text-xl">Activities</h2>
                {allActivities.map((activity) =>
                    <div key={activity.activity_id} className="border-t-2 border-dashed border-gray-400 py-2">
                        <div className="flex justify-between">
                            <span className="basis-1/3">Activity ID: {activity.activity_id}</span>
                            <span className="basis-1/3">{activity.activity_name}</span>
                            <span className="basis-1/3">{activity.activity_duration_minute} min</span>
                        </div>
                    </div>
                )}

                <h2 className="text-xl">Locations</h2>
                {allLocations.map((location) =>
                    <div key={location.location_id} className="border-t-2 border-dashed border-gray-400 py-2">
                        <div className="flex justify-between">
                            <span className="basis-1/3">Location ID: {location.location_id}</span>
                            <span className="basis-2/3">{location.location_name}</span>
                        </div>
                    </div>
                )}

                <h2 className="text-xl">Trainers</h2>
                {allTrainers.map((trainer) =>
                    <div key={trainer.id} className="border-t-2 border-dashed border-gray-400 py-2">
                        <div className="flex justify-between">
                            <span className="basis-1/3">Trainer ID: {trainer.id}</span>
                            <span className="basis-2/3">{trainer.firstName} {trainer.lastName}</span>
                        </div>
                    </div>
                )}
            </div>
        </>
}

export default ReferenceList
