import { db } from "../database.js"
import { convertToMySQLDate } from "../database.js"

export function newClass(
    class_id,
    class_date,
    class_time,
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
        class_id,
        class_date,
        class_time,
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

// export async function getAll() {
//     const [allClasses] = await db.query(
//         "SELECT * FROM classes"
//     )

//     return await allClasses.map((classResult) =>
//         newClass(
//             classResult.class_id.toString(),
//             classResult.class_date,
//             classResult.class_time,
//             classResult.location_id,
//             classResult.activity_id,
//             classResult.trainer_user_id,
//             // classResult.created_at,
//             // classResult.updated_at,
//         ))
// }

export async function getAll() {
    const [allClasses] = await db.query(
        "SELECT * FROM classes "
        + "INNER JOIN locations ON classes.location_id = locations.location_id "
        + "INNER JOIN activities ON classes.activity_id = activities.activity_id "
        + "INNER JOIN users ON classes.trainer_user_id = users.id "
        + "ORDER BY class_date ASC"
    )

    // return allClasses    // check what's returned
    return await allClasses.map((classResult) =>
        newClass(
            classResult.class_id.toString(),
            classResult.class_date,
            classResult.class_time,
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

export async function getByDateRange(startDate, endDate) {
    const [allClasses] = await db.query(
        "SELECT * FROM classes "
        + "INNER JOIN locations ON classes.location_id = locations.location_id "
        + "INNER JOIN activities ON classes.activity_id = activities.activity_id "
        + "INNER JOIN users ON classes.trainer_user_id = users.id "
        + "WHERE class_date BETWEEN ? AND ? "
        + "ORDER BY class_date ASC, class_time ASC"
    , [startDate, endDate])

    // return allClasses    // check what's returned
    return await allClasses.map((classResult) =>
        newClass(
            classResult.class_id.toString(),
            classResult.class_date,
            classResult.class_time,
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

export async function getByTrainerUserID(trainerUserID) {
    const [allClasses] = await db.query(
        "SELECT * FROM classes "
        + "INNER JOIN locations ON classes.location_id = locations.location_id "
        + "INNER JOIN activities ON classes.activity_id = activities.activity_id "
        + "INNER JOIN users ON classes.trainer_user_id = users.id "
        + "WHERE trainer_user_id = ? "
        + "ORDER BY class_date ASC, class_time ASC",
        trainerUserID
    )

    if (allClasses.length > 0) {
        // const classResult = results[0];
        return Promise.resolve(
            allClasses.map(classResult =>
                newClass(
                    classResult.class_id.toString(),
                    classResult.class_date,
                    classResult.class_time,
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
                )
            )
        )
    } else {
        return Promise.reject("no results found");
    }
}

export async function getByDateAndActivity(date) {
    const [allClasses] = await db.query(
        "SELECT DISTINCT activity_name FROM classes "
        + "INNER JOIN activities ON classes.activity_id = activities.activity_id "
        + "WHERE class_date = ?"
    , date)

    return await allClasses.map((classResult) =>
            // classResult.activity_id,
            classResult.activity_name,
            // classResult.activity_description,
            // classResult.activity_duration_minute,
        )
}

export async function getAllDatesAndDays() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const [allDates] = await db.query(
        "SELECT DISTINCT class_date FROM classes WHERE class_date >= current_date() ORDER BY class_date"
    )

    return await allDates.map(results =>
        results.class_date
    )
}

export async function create(newClassInfo) {
    return db.query(
        "INSERT INTO classes "
        + "(class_date, class_time, location_id, activity_id, trainer_user_id) "
        + "VALUE (?, ?, ?, ?, ?)",
        [
            newClassInfo.class_date,
            newClassInfo.class_time,
            newClassInfo.location_id,
            newClassInfo.activity_id,
            newClassInfo.trainer_user_id
        ]
    ).then(([result]) => {
        return { class_id: result.insertId }
    })
}

export async function deleteByID(classID) {
    return db.query(
        "DELETE FROM classes WHERE class_id = ?", classID
    )
}

// TODO: (future) add update class functions if needed


// Test code below

// const newClassInfo = newClass(
//     null,
//     "2024-05-08",
//     "18:30",
//     1,  // location_id
//     1,  // activity_id
//     2,  // trainer_id
// )
// create(newClassInfo).then(getAll().then(result => console.log(result)))
// create(newClass).then(result => console.log(result))

// getAll().then(result => console.log(result))

// const startDate = new Date().toLocaleDateString().replaceAll("/", "-")
// const endDate = new Date().toLocaleDateString().replaceAll("/", "-")
// console.log(startDate, endDate)
// getByDateRange(startDate, "2024-05-09").then(result => console.log(result))

// getByTrainerUserID(2).then(result => console.log(result))
