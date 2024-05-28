import { API_URL } from "./api"

export async function getByActivityID(activityID, authenticationKey) {
    // GET from the API /classes
    const response = await fetch(
        API_URL + "/classes/" + activityID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'X-AUTH-KEY': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    console.log(APIResponseObject)

    return APIResponseObject
}

export async function getAll(authenticationKey) {
    // GET from the API /classes
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
