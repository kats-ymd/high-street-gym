import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"
import * as Classes from "../api/classes"
import * as Bookings from "../api/bookings"
import LoadingSpinner from "../components/LoadingSpinner"

function CreateBooking () {
    const navigate = useNavigate()
    const { activityID } = useParams()
    const [user] = useAuthentication()
    const location = useLocation()
    const [selectedDateAndActivity, setSelectedDateAndActivity] = useState(location.state)
    const [allDatesAndDays, setAllDatesAndDays] = useState([])
    const [allClasses, setAllClasses] = useState([])
    const [originallySelectedClass, setOriginallySelectedClass] = useState()
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const [formData, setFormData] = useState({
        userID: "",
        classID: ""
    })
    const [loading, setLoading] = useState(true)
    const [selectedOption, setSelectedOption] = useState('')
    const [statusMessage, setStatusMessage] = useState('')

    useEffect(() => {
        if (user) {
            Classes.getByActivityID(activityID, user.authenticationKey).then(results => {
                setAllClasses(results.allClasses)
                setAllDatesAndDays(results.datesAndDays)
            })
            .catch((error) => console.error("Error fetching classes:", error))
        }
    }, [user])

    useEffect(() => {
        if (allClasses.length > 0) {
            setOriginallySelectedClass(
                allClasses.find(({ class_date }) => class_date == selectedDateAndActivity.classDate.class_date)
            )
        }
    }, [allClasses])

    useEffect(() => {
        if (originallySelectedClass) {
            setSelectedOption(originallySelectedClass.class_id)
            setFormData({
                ...formData,
                classID: originallySelectedClass.class_id
            })
            setLoading(false)
        }
    }, [originallySelectedClass])

    console.log(originallySelectedClass)
    // console.log(selectedClass)
    console.log(allDatesAndDays)
    console.log(allClasses)

    function handleSelectOnChange(e) {
        setSelectedOption(e.target.value)
        setFormData(existing => { return { ...existing, classID: e.target.value } })
    }

    function handleBookingOnClick(e) {
        e.preventDefault()

        const bookingData = {
            ...formData,
            userID: user.id,
        }
        console.log("frontend", bookingData)

        Bookings.create(bookingData, user.authenticationKey).then(result => {
            console.log(result)
            if (result.status == 200) {
                setStatusMessage(result.message)
                setFormData({
                    userID: "",
                    classID: ""
                })
                navigate("/bookings")
            } else {
                setStatusMessage(result.message)
            }
        })
    }

    return loading ? <LoadingSpinner /> : <>
        <div className="mx-1">
            <h1 className="text-2xl pb-2">Create Booking</h1>
            <p className="text-4xl font-bold text-center my-4">
                {originallySelectedClass.activity_name}
            </p>
            <form
                onSubmit={handleBookingOnClick}
                className="flex flex-col gap-y-2">
                <select
                    value={selectedOption}
                    onChange={handleSelectOnChange}
                    className="select select-bordered"
                >
                    {allDatesAndDays.map((datesAndDays) =>
                        <optgroup
                            key={datesAndDays.classDate}
                            label={
                                `${daysOfWeek[new Date(datesAndDays.classDate).getDay()]}`
                                + ` - ` +
                                `${new Date(datesAndDays.classDate).toLocaleDateString()}`
                            }
                            className=""
                        >
                            {allClasses.map((classes, index) =>
                                datesAndDays.classDate == classes.class_date &&
                                <option
                                    key={classes[index]}
                                    value={classes.class_id}
                                    className=""
                                >
                                    {/* {classes.class_id} -
                                    &nbsp; */}
                                    {daysOfWeek[new Date(datesAndDays.classDate).getDay()]}
                                    &nbsp;
                                    {new Date(classes.class_date).toLocaleDateString()}
                                    &nbsp;
                                    {classes.class_time.slice(0, -3)}
                                    &nbsp;
                                    @{classes.location_name}
                                    &nbsp;
                                    with {classes.trainer_first_name}
                                </option>)
                                // )
                            }
                        </optgroup>
                    )}
                </select>
                <div className="flex flex-wrap">
                    <button
                        type="submit"
                        onClick={handleBookingOnClick}
                        className="btn flex-grow"
                    >
                        Book
                    </button>
                    <button
                        onClick={() => navigate("/timetable")}
                        className="btn btn-ghost flex-grow"
                    >
                        Back
                    </button>
                </div>
                <span className="text-base text-red-600">{statusMessage}</span>
            </form>
        </div>
    </>
}

export default CreateBooking
