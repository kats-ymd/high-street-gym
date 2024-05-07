import { db } from "../database.js"

export function newActivity(
    id,
    name,
    description,
    duration_minute,
    // created_at,
    // updated_at,
) {
    return {
        id,
        name,
        description,
        duration_minute,
        // created_at,
        // updated_at,
    }
}

export async function getAll() {
    const [allActivities] = await db.query(
        "SELECT * FROM activities"
    )

    return await allActivities.map((activityResult) =>
        newActivity(
            activityResult.id.toString(),
            activityResult.name,
            activityResult.description,
            activityResult.duration_minute,
            // activityResult.created_at,
            // activityResult.updated_at,
        ))
}

async function getByID(activityID) {
    const [results] = await db.query(
        "SELECT * FROM activities WHERE id = ?", activityID
    )

    if (results.length > 0) {
        const activityResult = results[0];
        return Promise.resolve(
            newActivity(
                activityResult.id,
                activityResult.name,
                activityResult.description,
                activityResult.duration_minute
            )
        )
    } else {
        return Promise.reject("no results found");
    }
}

export async function create(activity) {
    return db.query(
        "INSERT INTO activities "
        + "(name, description, duration_minute) "
        + "VALUE (?, ?, ?)",
        [
            activity.name,
            activity.description,
            activity.duration_minute
        ]
    ).then(([result]) => {
        return { id: result.insertId }
    })
}

// TODO: (future) add update, delete activity functions if needed


// Test code below

// const activity = newActivity(
//     null,
//     "Zumba",
//     "Dance and exercise together",
//     45
// )
// create(activity).then(result => console.log(result))

// getAll().then(result => console.log(result))
// getByID(6).then(result => console.log(result))
