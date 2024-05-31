import { Router } from "express";
import * as Activities from "../models/activities.js"
import auth from "../middleware/auth.js";

// TODO: Implement input validation

const activityController = Router()

activityController.get("/", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const activities = await Activities.getAll()

    res.status(200).json({
        status: 200,
        message: "Get all activities",
        activity: activities,
    })
})

export default activityController
