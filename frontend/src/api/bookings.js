import { API_URL } from "./api"

export async function getByUserID(userID, authenticationKey) {
    // GET from the API /bookings
    const response = await fetch(
        API_URL + "/bookings/" + userID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'X-AUTH-KEY': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject
}

// export async function getAll(authenticationKey) {
//     // GET from the API /users
//     const response = await fetch(
//         API_URL + "/bookings",
//         {
//             method: "GET",
//             headers: {
//                 'Content-Type': "application/json",
//                 'X-AUTH-KEY': authenticationKey
//             },
//         }
//     )

//     const APIResponseObject = await response.json()

//     return APIResponseObject
// }

export async function create(booking, authenticationKey) {
    const response = await fetch(
        API_URL + "/bookings",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'X-AUTH-KEY': authenticationKey
            },
            body: JSON.stringify({ booking })
        }
    )

    const postUserResult = await response.json()

    return postUserResult
}

export async function deleteByID(bookingID, authenticationKey) {
    const response = await fetch(
        API_URL + "/bookings/" + bookingID,
        {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                'X-AUTH-KEY': authenticationKey
            },
            body: JSON.stringify({})
        }
    )

    const deleteResult = await response.json()

    return deleteResult
}
