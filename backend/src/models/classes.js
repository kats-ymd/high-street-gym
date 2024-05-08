import { db } from "../database.js"

export function newClass(
    id,
    date,
    time,
    location_id,
    activity_id,
    trainer_user_id,
    // created_at,
    // updated_at,
    location_name,
    activity_name,
    activity_description,
    activity_duration_minute,
    trainer_first_name,
    trainer_last_name,
) {
    return {
        id,
        date,
        time,
        location_id,
        activity_id,
        trainer_user_id,
        // created_at,
        // updated_at,
        location_name,
        activity_name,
        activity_description,
        activity_duration_minute,
        trainer_first_name,
        trainer_last_name,
    }
}

export async function getAll() {
    const [allClasses] = await db.query(
        "SELECT * FROM classes "
        + "INNER JOIN locations ON classes.location_id = locations.location_id "
        + "INNER JOIN activities ON classes.activity_id = activities.activity_id "
        + "INNER JOIN users ON classes.trainer_user_id = users.id"
    )

    // return allClasses    // check what's returned
    return await allClasses.map((classResult) =>
        newClass(
            classResult.id.toString(),
            classResult.date,
            classResult.time,
            classResult.location_id,
            classResult.activity_id,
            classResult.trainer_user_id,
            // classResult.created_at,
            // classResult.updated_at,
            classResult.location_name,
            classResult.activity_name,
            classResult.activity_description,
            classResult.activity_duration_minute,
            classResult.first_name,
            classResult.last_name,
        ))
}

// export async function getAll() {
//     const [allClasses] = await db.query(
//         "SELECT * FROM classes"
//     )

//     return await allClasses.map((classResult) =>
//         newClass(
//             classResult.id.toString(),
//             classResult.date,
//             classResult.time,
//             classResult.location_id,
//             classResult.activity_id,
//             classResult.trainer_user_id,
//             // classResult.created_at,
//             // classResult.updated_at,
//         ))
// }

async function getByID(classID) {
    const [results] = await db.query(
        "SELECT * FROM classes WHERE id = ?", classID
    )

    if (results.length > 0) {
        const classResult = results[0];
        return Promise.resolve(
            newClass(
                bookingResult.id.toString(),
                classResult.date,
                classResult.time,
                classResult.location_id,
                classResult.activity_id,
                classResult.trainer_user_id,
            )
        )
    } else {
        return Promise.reject("no results found");
    }
}

export async function create(newClassInfo) {
    return db.query(
        "INSERT INTO classes "
        + "(date, time, location_id, activity_id, trainer_user_id) "
        + "VALUE (?, ?, ?, ?, ?)",
        [
            newClassInfo.date,
            newClassInfo.time,
            newClassInfo.location_id,
            newClassInfo.activity_id,
            newClassInfo.trainer_user_id
        ]
    ).then(([result]) => {
        return { id: result.insertId }
    })
}

export async function deleteByID(classID) {
    return db.query(
        "DELETE FROM classes WHERE id = ?", classID
    )
}

// TODO: (future) add update class functions if needed


// Test code below

// const newClassInfo = newClass(
//     null,
//     "2024-05-08",
//     "16:00",
//     1,
//     5,
//     2,
// )
// create(newClassInfo).then(getAll().then(result => console.log(result)))
// create(newClass).then(result => console.log(result))

getAll().then(result => console.log(result))
// getByID(6).then(result => console.log(result))
