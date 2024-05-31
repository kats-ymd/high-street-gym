import { API_URL } from "./api.js"

export async function getAll(authenticationKey) {
    // GET from the API /activities
    const response = await fetch(
        API_URL + "/activities",
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
