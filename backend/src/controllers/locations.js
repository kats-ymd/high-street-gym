import { Router } from "express";
import * as Locations from "../models/locations.js"
import auth from "../middleware/auth.js";

// TODO: Implement input validation

const locationController = Router()

locationController.get("/", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const locations = await Locations.getAll()

    res.status(200).json({
        status: 200,
        message: "Get all locations",
        location: locations,
    })
})

export default locationController
