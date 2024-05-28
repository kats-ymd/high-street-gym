import { db } from "../database.js"

export function newBooking(
    booking_id,
    booking_user_id,
    class_id,
    // created_at,
    // updated_at,
    trainer_first_name,
    trainer_last_name,
    class_date,
    class_time,
    activity_name,
    location_name,
) {
    return {
        booking_id,
        booking_user_id,
        class_id,
        // created_at,
        // updated_at,
        trainer_first_name,
        trainer_last_name,
        class_date,
        class_time,
        activity_name,
        location_name,
    }
}

export async function getAll() {
    const [allBookings] = await db.query(
        "SELECT * FROM bookings"
    )

    return await allBookings.map((bookingResult) =>
        newBooking(
            bookingResult.booking_id.toString(),
            bookingResult.user_id,
            bookingResult.class_id,
            // bookingResult.created_at,
            // bookingResult.updated_at,
        ))
}

export async function getByUserID(userID) {
    const [allBookings] = await db.query(
        "SELECT bookings.booking_id, bookings.user_id, bookings.class_id, "
        + "users.first_name, users.last_name, "
        + "classes.class_date, classes.class_time, "
        + "activities.activity_name, locations.location_name "
        + "FROM bookings "
        // + "INNER JOIN users ON bookings.user_id = users.id "
        + "INNER JOIN classes ON bookings.class_id = classes.class_id "
        + "INNER JOIN locations ON classes.location_id = locations.location_id "
        + "INNER JOIN activities ON classes.activity_id = activities.activity_id "
        + "INNER JOIN users ON classes.trainer_user_id = users.id "
        + "WHERE bookings.user_id = ? "
        + "AND ((classes.class_date = CURRENT_DATE() AND classes.class_time >= CURRENT_TIME()) OR classes.class_date >= (CURRENT_DATE() + INTERVAL 1 DAY))"
        + "ORDER BY classes.class_date ASC, classes.class_time ASC",
        userID
    )

    if (allBookings.length > 0) {
        return Promise.resolve(
            allBookings.map(bookingResult =>
                newBooking(
                    bookingResult.booking_id.toString(),
                    bookingResult.user_id,
                    bookingResult.class_id,
                    bookingResult.first_name,
                    bookingResult.last_name,
                    bookingResult.class_date,
                    bookingResult.class_time,
                    bookingResult.activity_name,
                    bookingResult.location_name,
                )
            )
        )
    } else {
        return Promise.reject("no results found");
    }
}

export async function create(booking) {
    return db.query(
        "INSERT INTO bookings "
        + "(user_id, class_id) "
        + "VALUE (?, ?)",
        [
            booking.userID,
            booking.classID
        ]
    ).then(([result]) => {
        return { id: result.insertId }
    })
}

export async function deleteByID(bookingID) {
    return db.query(
        "DELETE FROM bookings WHERE booking_id = ?", bookingID
    )
}

// TODO: (future) add update booking functions if needed


// Test code below

// const activity = newActivity(
//     null,
//     "Zumba",
//     "Dance and exercise together",
//     45
// )
// create(activity).then(result => console.log(result))

// getAll().then(result => console.log(result))
// getByUserID(3).then(result => console.log(result))
