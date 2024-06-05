import { useEffect, useState } from "react"
import { useAuthentication } from "../hooks/authentication"
import * as Classes from "../api/classes"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

function Timetable () {
    const navigate = useNavigate()

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

    function handleOnClick(classDate, activity) {
        if (user.role == "trainer") {
            window.alert(`Class booking is only for customers, not for trainers`)
            return
        } else {
            navigate(
                `/createBooking/${activity.activity_id}`,
                { state: { classDate: classDate, activity: activity } }
            )
            // console.log(classDate, activity)
        }
    }

    return loading ? <LoadingSpinner /> : <>
        <div className="mx-1">
            <h1 className="text-2xl pb-2">Currently offered classes:</h1>
            <form className="flex flex-col">
                {allClassDatesAndDays.map((eachClassDate, index) =>
                    <div
                        key={eachClassDate.class_date}
                        className="px-0.5 py-1"
                    >
                        <div
                            className="
                                border
                                border-black
                                flex
                                justify-between
                            ">
                            <span className="mx-1">{eachClassDate.class_day}</span>
                            <span className="mx-1">{new Date(eachClassDate.class_date).toLocaleDateString()}</span>
                        </div>

                        {activitiesOfDay[index].map((activities) =>
                            <div
                                key={activities.activity_id}
                                className="
                                    columns-2
                                    flex
                                    justify-between
                                    px-1.5
                                ">
                                <span>{activities.activity_name}</span>
                                <button
                                    onClick={() => handleOnClick(eachClassDate, activities)}
                                    className="text-blue-600"
                                >
                                    Book &gt;
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    </>
}

export default Timetable
