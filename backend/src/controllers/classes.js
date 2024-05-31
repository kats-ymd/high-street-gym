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

classController.post("/upload-xml", auth(["admin", "trainer"]), (req, res) => {
    const validationErrorMessage = "Invalid class information input: "

    function validateInput(classData) {
        if (!/^(\d{4})(\/|-)(\d{1,2})\2(\d{1,2})$/.test(classData.date.toString())) {
            throw new Error(validationErrorMessage + "date format should be YYYY-MM-DD or YYYY/MM/DD")
        }
        if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(classData.time.toString())) {
            throw new Error(validationErrorMessage + "time format should be HH:MM")
        }
        if (!/^[1-9]\d*$/.test(classData.location.toString())) {
            throw new Error(validationErrorMessage + "Invalid location ID specified. Refer to location list.")
        }
        if (!/^[1-9]\d*$/.test(classData.activity.toString())) {
            throw new Error(validationErrorMessage + "Invalid activity ID specified. Refer to activity list.")
        }
        if (!/^[1-9]\d*$/.test(classData.trainer.toString())) {
            throw new Error(validationErrorMessage + "Invalid trainer ID specified. Refer to trainer list.")
        }
    }

    if (req.files && req.files["xml-file"]) {
        // Access the XML file as a string
        const XMLFile = req.files["xml-file"]
        const file_text = XMLFile.data.toString()

        // Set up XML parser
        const parser = new xml2js.Parser();
        parser.parseStringPromise(file_text)
            .then(data => {
                const classUpload = data["upload-classes"]
                const classUploadAttributes = classUpload["$"]
                const operation = classUploadAttributes["operation"]
                // Slightly painful indexing to reach nested children
                const classesData = classUpload["classes"][0]["class"]

                if (operation == "insert") {
                    Promise.all(classesData.map((classData) => {
                        return new Promise((resolve, reject) => {
                            try {
                                validateInput(classData)

                                // Convert the xml object into a model object
                                const classModel = Classes.newClass(
                                    null,
                                    classData.date.toString(),
                                    classData.time.toString(),
                                    classData.location.toString(),
                                    classData.activity.toString(),
                                    classData.trainer.toString(),
                                )
                                console.log(classModel)
                                resolve(classModel)
                            } catch (error) {
                                reject(error)
                            }
                        }).then(classModel => {
                            // Return the promise of each creation query
                            // return Classes.create(classModel)
                        })
                    })).then(results => {
                        res.status(200).json({
                            status: 200,
                            message: "XML Upload insert successful",
                        })
                    }).catch(error => {
                        if (error.message.includes(validationErrorMessage)) {
                            res.status(400).json({
                                status: 400,
                                message: error.message,
                                // if only error object is returned, React error occurs because it cannot be rendered.
                                // specifying error.message makes it string, something that can be rendered by React.
                                //
                                // eg. other message in the code works fine
                                // as without knowing it always is combined with some "string" and become string...
                            })
                        } else {
                            res.status(500).json({
                                status: 500,
                                message: "XML upload failed on database operation - " + error,
                            })
                        }
                    })

                } else if (operation == "update") {
                    res.status(501).json({
                        status: 501,
                        message: "update classes not supported",
                    })

                    // TODO: check if the class has customers booked already or not
                    // Promise.all(classesData.map((classData) => {
                    //     // Convert the xml object into a model object
                    //     const classModel = Classes.newUser(
                    //         classData.id.toString(),
                    //         classData.date.toString(),
                    //         classData.time.toString(),
                    //         classData.location.toString(),
                    //         classData.activity.toString(),
                    //         classData.trainer.toString(),
                    //     )

                    //     // Return the promise of each creation query
                    //     return Classes.update(classModel)

                    // })).then(results => {
                    //     res.status(200).json({
                    //         status: 200,
                    //         message: "XML Upload update successful",
                    //     })
                    // }).catch(error => {
                    //     res.status(500).json({
                    //         status: 500,
                    //         message: "XML upload failed on database operation - " + error,
                    //     })
                    // })

                } else {
                    res.status(400).json({
                        status: 400,
                        message: "XML Contains invalid operation attribute value",
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Error parsing XML - " + error,
                })
            })

    } else {
        res.status(400).json({
            status: 400,
            message: "No file selected",
        })
    }
})

export default classController
