import { db } from "../database.js"

export function newBooking(
    id,
    user_id,
    class_id,
    // created_at,
    // updated_at,
) {
    return {
        id,
        user_id,
        class_id,
        // created_at,
        // updated_at,
    }
}

export async function getAll() {
    const [allBookings] = await db.query(
        "SELECT * FROM bookings"
    )

    return await allBookings.map((bookingResult) =>
        newBooking(
            bookingResult.id.toString(),
            bookingResult.user_id,
            bookingResult.class_id,
            // bookingResult.created_at,
            // bookingResult.updated_at,
        ))
}

async function getByUserID(userID) {
    const [results] = await db.query(
        "SELECT * FROM bookings WHERE user_id = ?", userID
    )

    if (results.length > 0) {
        const bookingResult = results[0];
        return Promise.resolve(
            newBooking(
                bookingResult.id.toString(),
                bookingResult.user_id,
                bookingResult.class_id,
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
            booking.user_id,
            booking.class_id
        ]
    ).then(([result]) => {
        return { id: result.insertId }
    })
}

export async function deleteByID(bookingID) {
    return db.query(
        "DELETE FROM bookings WHERE id = ?", bookingID
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
// getByID(6).then(result => console.log(result))
