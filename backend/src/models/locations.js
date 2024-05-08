import { db } from "../database.js"

export function newLocation(
    location_id,
    location_name,
    // created_at,
    // updated_at,
) {
    return {
        location_id,
        location_name,
        // created_at,
        // updated_at,
    }
}

export async function getAll() {
    const [allLocationsResults] = await db.query(
        "SELECT * FROM locations"
    )

    return await allLocationsResults.map((locationResult) =>
        newLocation(
            locationResult.location_id.toString(),
            locationResult.location_name,
            // locationResult.created_at,
            // locationResult.updated_at,
        ))
    // return await allLocationsResults
}

async function getByID(locationID) {
    const [results] = await db.query(
        "SELECT * FROM locations WHERE location_id = ?", locationID
    )

    if (results.length > 0) {
        const locationResult = results[0];
        return Promise.resolve(
            newLocation(
                locationResult.location_id.toString(),
                locationResult.location_name,
            )
        )
    } else {
        return Promise.reject("no results found");
    }
}

export async function create(location) {
    return db.query(
        "INSERT INTO locations "
        + "(location_name) "
        + "VALUE (?)",
        [
            location.location_name,
        ]
    ).then(([result]) => {
        return { location_id: result.insertId }
    })
}

// TODO: (future) add update, delete location functions if needed


// Test code below

// const location = newLocation(
//     null,
//     "Mansfield",
// )
// // create(location).then(result => console.log(result))
// create(location).then(getAll().then(result => console.log(result)))

// getAll().then(result => console.log(result))
// getByID(1).then(result => console.log(result))
