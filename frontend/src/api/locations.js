import { API_URL } from "./api.js"

export async function getAll(authenticationKey) {
    // GET from the API /locations
    const response = await fetch(
        API_URL + "/locations",
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
