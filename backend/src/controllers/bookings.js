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

export default bookingController
