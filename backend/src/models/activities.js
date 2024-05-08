import { db } from "../database.js"

export function newActivity(
    activity_id,
    activity_name,
    activity_description,
    activity_duration_minute,
    // created_at,
    // updated_at,
) {
    return {
        activity_id,
        activity_name,
        activity_description,
        activity_duration_minute,
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
            activityResult.activity_id.toString(),
            activityResult.activity_name,
            activityResult.activity_description,
            activityResult.activity_duration_minute,
            // activityResult.created_at,
            // activityResult.updated_at,
        ))
}

async function getByID(activityID) {
    const [results] = await db.query(
        "SELECT * FROM activities WHERE activity_id = ?", activityID
    )

    if (results.length > 0) {
        const activityResult = results[0];
        return Promise.resolve(
            newActivity(
                activityResult.activity_id,
                activityResult.activity_name,
                activityResult.activity_description,
                activityResult.activity_duration_minute
            )
        )
    } else {
        return Promise.reject("no results found");
    }
}

export async function create(activity) {
    return db.query(
        "INSERT INTO activities "
        + "(activity_name, activity_description, activity_duration_minute) "
        + "VALUE (?, ?, ?)",
        [
            activity.activity_name,
            activity.activity_description,
            activity.activity_duration_minute
        ]
    ).then(([result]) => {
        return { activity_id: result.insertId }
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
