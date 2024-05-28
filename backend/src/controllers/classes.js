import { Router } from "express";
import xml2js from "xml2js"
import * as Classes from "../models/classes.js"
import * as Users from "../models/users.js";
import auth from "../middleware/auth.js";

const classController = Router()

// TODO: Input validation

// classController.get("/", auth(["admin", "trainer", "customer"]), async (req, res) => {
//     const classes = await Classes.getAll()

//     res.status(200).json({
//         status: 200,
//         message: "Get all classes",
//         classes: classes,
//     })
// })

classController.get("/", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const allClassDates = await Classes.getAllDatesAndDays()

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let allClassDatesAndDays = []
    let activitiesOfDay = []

    for (const classDate of allClassDates) {
        const activities = await Classes.getByDateAndActivity(classDate)

        allClassDatesAndDays.push({
            class_date: classDate,
            class_day: daysOfWeek[classDate.getDay()],
            // activitiesOfDay: activities
        })

        // console.log(activities)
        activitiesOfDay.push(activities)

        // TODO: (future) combine the two variables together if possible?
    }

    // console.log(allClassDatesAndDays)
    // console.log(activitiesOfDay)

    res.status(200).json({
        status: 200,
        message: "Get all classes",
        allClassDatesAndDays: allClassDatesAndDays,
        activitiesOfDay: activitiesOfDay
    })
})

classController.get("/:activityID", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const activityID = req.params.activityID

    const datesAndDays = await Classes.getDatesAndDaysByActivityID(activityID)

    // console.log("controller", datesAndDays)

    Classes.getByActivityID(activityID).then(allClasses => {
        res.status(200).json({
            status: 200,
            message: "Got all classes of the activity",
            allClasses: allClasses,
            datesAndDays: datesAndDays,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Error: " + error,
        })
    })
})

export default classController
