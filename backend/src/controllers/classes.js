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
    const classesDates = await Classes.getAllDatesAndDays()
    const classesOfDate = await Classes.getByDateRange("2024-05-08", "2024-05-08")

    console.log(classesDates)
    // console.log(classesOfDate)

    res.status(200).json({
        status: 200,
        message: "Get all classes",
        classesDates: classesDates,
        classes: classesOfDate,
        test: "test"
    })
})

export default classController
