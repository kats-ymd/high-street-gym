import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useLocation } from "react-router-dom"
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
    // console.log(allDatesAndDays)
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
        // console.log("frontend", bookingData)

        Bookings.create(bookingData, user.authenticationKey).then(result => {
            // setStatusMessage(result.message)
            setFormData({
                userID: "",
                classID: ""
            })
            navigate("/bookings")
        })
    }

    return loading ? <LoadingSpinner /> : <>
        <h1 className="text-2xl my-4">Create Booking</h1>
        <span className="text-4xl">{originallySelectedClass.activity_name}</span>
        <form
            onSubmit={handleBookingOnClick}
            className="flex flex-col my-4">
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
                                className="flex justify-between"
                            >
                                {classes.class_id} -
                                &nbsp;
                                {daysOfWeek[new Date(datesAndDays.classDate).getDay()]}
                                &nbsp;&nbsp;
                                {new Date(classes.class_date).toLocaleDateString()}
                                &nbsp;&nbsp;
                                {classes.class_time}
                                &nbsp;&nbsp;
                                @{classes.location_name}
                                &nbsp;&nbsp;
                                with {classes.trainer_first_name}
                            </option>)
                            // )
                        }
                    </optgroup>
                )}
            </select>
            <div>
                <button
                    type="submit"
                    onClick={handleBookingOnClick}
                    className="btn">Book</button>
                <Link to="/timetable" className="btn btn-ghost">Back</Link>
            </div>
        </form>
    </>
}

export default CreateBooking
