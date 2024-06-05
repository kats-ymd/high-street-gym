import { Router } from "express";
import * as Bookings from "../models/bookings.js"
import * as Users from "../models/users.js"
import * as Classes from "../models/classes.js"
import auth from "../middleware/auth.js";

const bookingController = Router()

// TODO: Input validation

// classController.get("/", auth(["admin", "trainer", "customer"]), async (req, res) => {
//     const classes = await Classes.getAll()

//     res.status(200).json({
//         status: 200,
//         message: "Get all classes",
//         classes: classes,
//     })
// })

bookingController.get("/:id", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const userID = req.params.id

    if (!/^[1-9]\d*$/.test(userID)) {
        res.status(400).json({
            status: 400,
            message: "Invalid request",
        })
        return
    }

    Users.getByID(userID).then(user => {
        if (user.role == "trainer") {
            Classes.getByTrainerUserID(userID).then(classes => {
                res.status(200).json({
                    status: 200,
                    message: "Got trainer's classes",
                    // bookings: bookings,
                    classes: classes,
                })
            }).catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Error: " + error,
                })
            })
        } else {
            Bookings.getByUserID(userID).then(bookings => {
                res.status(200).json({
                    status: 200,
                    message: "Got all bookings",
                    bookings: bookings,
                })
            }).catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Error: " + error,
                })
            })
        }
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Error: " + error,
        })
    })
})

bookingController.post("/", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const bookingData = req.body.booking

    if (!/^[1-9]\d*$/.test(bookingData.userID)) {
        res.status(400).json({
            status: 400,
            message: "Invalid request",
        })
        return
    }
    if (!/^[1-9]\d*$/.test(bookingData.classID)) {
        res.status(400).json({
            status: 400,
            message: "Invalid request",
        })
        return
    }

    // check if same class ID already exists in the user's booking table
    const existingBookings = await Bookings.getByUserID(bookingData.userID)
    if (existingBookings.some(booking => booking.class_id == bookingData.classID)) {
        return res.status(400).json({
            status: 400,
            message: "Failed to book: Same class has already been booked!"
        })
    }
    // console.log("existing bookings", existingBookings)

    // get the class_date, class_time, and activity_duration of the class being booked
    const classBeingBooked = await Classes.getByID(bookingData.classID)
    // console.log("class being booked", classBeingBooked)

    function addMinutesToTime(time, minutesToAdd) {
        // breakdown time
        const [hours, minutes, seconds] = time.split(':').map(Number);

        // create new Date object, using UTC to avoid variation by different local time zones
        // note: year, month, date are placeholders and not effecting the final result
        const date = new Date(Date.UTC(2000, 0, 1, hours, minutes, seconds));

        // add minute
        date.setUTCMinutes(date.getUTCMinutes() + minutesToAdd);

        // return new time in HH:MM:SS format
        return date.toISOString().substr(11, 8);
    }

    // set the start time & end time of the class being booked
    // const classDate = new Date(classBeingBooked[0].class_date)
    const classStartTime = classBeingBooked[0].class_time
    const classEndTime = addMinutesToTime(classStartTime, classBeingBooked[0].activity_duration_minute)
    // console.log("class start time:", classStartTime, "class end time:", classEndTime)

    const existingBookingsOnSameDate = existingBookings.filter(booking => {
        let bookingDate = new Date(booking.class_date);
        return bookingDate.getFullYear() === classBeingBooked[0].class_date.getFullYear() &&
            bookingDate.getMonth() === classBeingBooked[0].class_date.getMonth() &&
            bookingDate.getDate() === classBeingBooked[0].class_date.getDate()
    })
    // console.log(existingBookingsOnSameDate)

    if (existingBookingsOnSameDate == 0) {
        // OK to book new class if:
        // - no other class booked on the same day

        console.log("no other class booked on the day, booking no problem!")

        Bookings.create(bookingData).then(booking => {
            res.status(200).json({
                status: 200,
                message: "Created booking",
                booking: booking
            })
        }).catch(error => {
            res.status(500).json({
                status: 500,
                message: "Failed to create booking:" + error,
            })
        })
    } else {
        // check if the time of the class being booked overlaps with the class times of the existing bookings
        for (let i = 0; i < existingBookingsOnSameDate.length; i++) {
            const existingBookingStartTime = existingBookingsOnSameDate[i].class_time
            const existingBookingEndTime = addMinutesToTime(existingBookingStartTime, existingBookingsOnSameDate[i].activity_duration_minute)
            console.log(i, existingBookingsOnSameDate[i], existingBookingStartTime, existingBookingEndTime)

            if (classStartTime >= existingBookingEndTime || classEndTime <= existingBookingStartTime) {
                // OK to book new class if:
                // - its start time is later than existing booking's end time
                // - its end time is earlier than existing booking's start time

                console.log("no class time overlap, booking no problem!")

                Bookings.create(bookingData).then(booking => {
                    res.status(200).json({
                        status: 200,
                        message: "Created booking",
                        booking: booking
                    })
                }).catch(error => {
                    res.status(500).json({
                        status: 500,
                        message: "Failed to create booking:" + error,
                    })
                })
            } else if ((classStartTime >= existingBookingStartTime && classStartTime < existingBookingEndTime)
                || (classEndTime > existingBookingStartTime && classEndTime <= existingBookingEndTime)
                || (classStartTime < existingBookingStartTime && classEndTime > existingBookingEndTime)) {
                // NG to book new class if:
                // a) its start time is between existing booking's start time & end time
                // b) its end time is between existing booking's start time & end time
                // c) its start time is earlier than existing booking's start time
                //  & its end time is later than existing booking's end time

                // console.log("Failed to book: New class time overlaps with existing class bookings")

                return res.status(400).json({
                    status: 400,
                    message: "Failed to book: New class time overlaps with existing class bookings"
                })
            }
        }
    }
})

bookingController.delete("/:id", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const bookingID = req.params.id

    // Implement request validation
    if (!/^[1-9]\d*$/.test(bookingID)) {
        res.status(400).json({
            status: 400,
            message: "Invalid request",
        })
        return
    }

    Bookings.deleteByID(bookingID).then(result => {
        res.status(200).json({
            status: 200,
            message: "Deleted booking",
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to delete booking:" + error,
        })
    })
})

export default bookingController
