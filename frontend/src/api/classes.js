import { API_URL } from "./api"

export async function getAll(authenticationKey) {
    // GET from the API /users
    const response = await fetch(
        API_URL + "/classes",
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
