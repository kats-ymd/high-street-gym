import { db } from "../database.js"

export async function getAll() {
    const [allLocationsResults] = await db.query("SELECT * FROM locations")

    // return await allLocationsResults.map((locationResult) =>
    // newLocation(locationResult.location_id, locationResult.location_name))
    return await allLocationsResults
}

getAll().then(result => console.log(result))