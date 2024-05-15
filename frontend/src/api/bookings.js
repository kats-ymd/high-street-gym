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

    console.log(APIResponseObject.message)

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
