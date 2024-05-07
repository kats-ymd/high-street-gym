import { db } from "../database.js"

export function newLocation(
    id,
    name,
    // created_at,
    // updated_at,
) {
    return {
        id,
        name,
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
            locationResult.id.toString(),
            locationResult.name,
            // locationResult.created_at,
            // locationResult.updated_at,
        ))
    // return await allLocationsResults
}

async function getByID(locationID) {
    const [results] = await db.query(
        "SELECT * FROM locations WHERE id = ?", locationID
    )

    if (results.length > 0) {
        const locationResult = results[0];
        return Promise.resolve(
            newLocation(
                locationResult.id.toString(),
                locationResult.name,
            )
        )
    } else {
        return Promise.reject("no results found");
    }
}

export async function create(location) {
    return db.query(
        "INSERT INTO locations "
        + "(name) "
        + "VALUE (?)",
        [
            location.name,
        ]
    ).then(([result]) => {
        return { id: result.insertId }
    })
}

// TODO: (future) add update, delete location functions if needed


// Test code below

// const location = newLocation(
//     null,
//     "Zumba",
// )
// create(location).then(result => console.log(result))

// getAll().then(result => console.log(result))
// getByID(1).then(result => console.log(result))
