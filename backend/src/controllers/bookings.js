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

    // const bookings = await Bookings.getByUserID(userID)

    // console.log(bookings)

    // res.status(200).json({
    //     status: 200,
    //     message: "Get all classes",
    //     bookings: bookings,
    // })

})

bookingController.post("/", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const bookingData = req.body.booking

    // console.log("backend", bookingData)

    // TODO: Input validation (prevent double booking)
    // check if same class ID already exists in the user's booking table
    const existingBooking = await Bookings.getByUserID(bookingData.userID)
    if (existingBooking.some(booking => booking.class_id == bookingData.classID)) {
        return res.status(400).json({
            status: 400,
            message: "Oops, same class has already been booked!"
        })
    }

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

})

bookingController.delete("/:id", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const bookingID = req.params.id

    // TODO: Implement request validation

    Bookings.deleteByID(bookingID).then(result => {
        res.status(200).json({
            status: 200,
            message: "Booking deleted",
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to delete booking",
        })
    })
})

export default bookingController
