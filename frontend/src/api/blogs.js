import { API_URL } from "./api.js"

export async function getAll(authenticationKey) {
    // GET from the API /blogs
    const response = await fetch(
        API_URL + "/blogs",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'X-AUTH-KEY': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.blogPosts
}

export async function getTop(amount, authenticationKey) {
    // GET from the API /blogs
    const response = await fetch(
        API_URL + "/blogs/top/" + amount,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'X-AUTH-KEY': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.blogPosts
}

export async function getByPage(page, authenticationKey) {
    // GET from the API /blogs
    const response = await fetch(
        API_URL + "/blogs/page/" + page,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'X-AUTH-KEY': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.blogPosts
}

// export async function getByUserID(userID) {
//     // GET from the API /sightings/user-id/:id
//     const response = await fetch(
//         API_URL + "/sightings/user/" + userID,
//         {
//             method: "GET",
//             headers: {
//                 'Content-Type': "application/json"
//             },
//         }
//     )

//     const APIResponseObject = await response.json()

//     return APIResponseObject.sightings
// }

// export async function getByID(sightingID) {
//     // GET from the API /sighting/:id
//     const response = await fetch(
//         API_URL + "/sightings/" + sightingID,
//         {
//             method: "GET",
//             headers: {
//                 'Content-Type': "application/json"
//             },
//         }
//     )

//     const APIResponseObject = await response.json()

//     return APIResponseObject.sighting
// }

export async function create(blogPost, authenticationKey) {
    const response = await fetch(
        API_URL + "/blogs",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'X-AUTH-KEY': authenticationKey
            },
            body: JSON.stringify(blogPost)
        }
    )

    const postCreateBlogPostResponse = await response.json()

    return postCreateBlogPostResponse
}

// Not implemented yet
// export async function updateSighting(sighting) {
//     const response = await fetch(
//         API_URL + "/sightings",
//         {
//             method: "PATCH",
//             headers: {
//                 'Content-Type': "application/json"
//             },
//             body: JSON.stringify(sighting)
//         }
//     )

//     const patchSightingResponse = await response.json()

//     return patchSightingResponse.sighting
// }

// export async function remove(sighting, authenticationKey) {
//     const response = await fetch(
//         API_URL + "/sightings/" + sighting.id,
//         {
//             method: "DELETE",
//             headers: {
//                 'Content-Type': "application/json",
//                 'X-AUTH-KEY': authenticationKey
//             },
//             body: JSON.stringify(sighting)
//         }
//     )

//     const deleteSightingResponse = await response.json()

//     return deleteSightingResponse
// }
