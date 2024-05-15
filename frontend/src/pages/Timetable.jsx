import { useEffect, useState } from "react"
import { useAuthentication } from "../hooks/authentication"
import * as Classes from "../api/classes"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

function Timetable () {

    const [user, , , ] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    // Load classes
    const [allClassDatesAndDays, setAllClassDatesAndDays] = useState([])
    const [activitiesOfDay, setActivitiesOfDay] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            Classes.getAll(user.authenticationKey).then(results => {
                setAllClassDatesAndDays(results.allClassDatesAndDays)
                setActivitiesOfDay(results.activitiesOfDay)
                setLoading(false)

                // console.log(results.allClassDatesAndDays)
                // console.log(results.activitiesOfDay)
            })
            .catch((error) => console.error("Error fetching classes:", error))
        }
    }, [user])

    return loading ? <LoadingSpinner /> : <>
        <div className="flex flex-col">
            <h1>This is the Timetable page!</h1>
            {allClassDatesAndDays.map((eachClassDate, index) =>
            <div key={eachClassDate.class_date}>
                <div className="border border-black flex justify-between">
                    <span className="mx-2">{eachClassDate.class_day}</span>
                    <span className="mx-2">{new Date(eachClassDate.class_date).toLocaleDateString()}</span>
                </div>

                {activitiesOfDay[index].map((activities) =>
                <div key={activities} className="columns-2 flex justify-between">
                    <span>{activities}</span>
                    <Link to="/createBooking">Book &gt;</Link>
                </div>
                )}
            </div>
            )}
        </div>
    </>
}

export default Timetable
