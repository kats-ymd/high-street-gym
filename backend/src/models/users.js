import { db } from "../database.js";

export function newUser(
    id,
    email,
    password,
    role,
    firstName,
    lastName,
    phone,
    address,
    authenticationKey,
    lastModifiedBy,
    lastModifiedAt,
) {
    return {
        id,
        email,
        password,
        role,
        firstName,
        lastName,
        phone,
        address,
        authenticationKey,
        lastModifiedBy,
        lastModifiedAt,
    }
}

export async function getAll() {
    const [allUserResults] = await db.query(
        "SELECT * FROM users"
    )

    return await allUserResults.map((userResult) =>
        newUser(
            userResult.id.toString(),
            userResult.email,
            userResult.password,
            userResult.role,
            userResult.first_name,
            userResult.last_name,
            userResult.phone,
            userResult.address,
            userResult.authentication_key,
            userResult.last_modified_by,
            userResult.last_modified_at,
        ))
}

export async function getByID(userID) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE id = ?", userID
    )

    if (userResults.length > 0) {
        const userResult = userResults[0]
        return Promise.resolve(
            newUser(
                userResult.id.toString(),
                userResult.email,
                userResult.password,
                userResult.role,
                userResult.first_name,
                userResult.last_name,
                userResult.phone,
                userResult.address,
                userResult.authentication_key,
                userResult.last_modified_by,
                userResult.last_modified_at,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByEmail(email) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE email = ?", email
    )

    if (userResults.length > 0) {
        const userResult = userResults[0]
        return Promise.resolve(
            newUser(
                userResult.id.toString(),
                userResult.email,
                userResult.password,
                userResult.role,
                userResult.first_name,
                userResult.last_name,
                userResult.phone,
                userResult.address,
                userResult.authentication_key,
                userResult.last_modified_by,
                userResult.last_modified_at,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByAuthenticationKey(authenticationKey) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE authentication_key = ?", 
        authenticationKey
    )

    if (userResults.length > 0) {
        const userResult = userResults[0]
        return Promise.resolve(
            newUser(
                userResult.id.toString(),
                userResult.email,
                userResult.password,
                userResult.role,
                userResult.first_name,
                userResult.last_name,
                userResult.phone,
                userResult.address,
                userResult.authentication_key,
                userResult.last_modified_by,
                userResult.last_modified_at,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function create(user) {
    delete user.id

    return db.query(
        "INSERT INTO users "
        + "(email, password, role, first_name, last_name, "
        + "phone, address, authentication_key, "
        + "last_modified_by, last_modified_at) "
        + "VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            user.email,
            user.password,
            user.role,
            user.firstName,
            user.lastName,
            user.phone,
            user.address,
            user.authenticationKey,
            user.lastModifiedBy,
            user.lastModifiedAt,
        ]
    ).then(([result]) => {
        return { ...user, id: result.insertId }
    })
}

export async function update(user) {
    return db.query(
        "UPDATE users SET "
        + "email = ?, "
        + "password = ?, "
        + "role = ?, "
        + "first_name = ?, "
        + "last_name = ?, "
        + "phone = ?, "
        + "address = ?, "
        + "authentication_key = ?, "
        + "last_modified_by = ?, "
        + "last_modified_at = ? "
        + "WHERE id = ?",
        [
            user.email,
            user.password,
            user.role,
            user.firstName,
            user.lastName,
            user.phone,
            user.address,
            user.authenticationKey,
            user.lastModifiedBy,
            user.lastModifiedAt,
            user.id
        ]
    ).then(([result]) => {
        // console.log(result)
        return { ...user }

        // return { ...user, id: result.insertId }
        /* This original return code from the reference project seems incorrect; 
        result of UPDATE operation does not provide "insertId",
        so the line incorrectly updates the user ID to be "0".
        Removing "id: result.insertId" makes it work correctly. */
    })
}

export async function deleteByID(userID) {
    return db.query("DELETE FROM users WHERE id = ?", userID)
}


// Test code below

// const user = newUser(
//     null,
//     "admin@trials.net",
//     "abc123",
//     "admin",
//     "Tim",
//     "Horton",
//     "0400-123-456",
//     "1234 ABC street, Brisbane, 4001",
//     null,
//     null,
//     null,
//     )
// create(user).then(result => console.log(result))

// const user = newUser(
//     1,
//     "admin@trials.net",
//     "abc123",
//     "admin",
//     "Tim",
//     "Horton",
//     "0400-123-456",
//     "1234 ABC street, Brisbane, 4001",
//     null,
//     null,
//     null,
//     )
// console.log(user)
// update(user).then(result => console.log(result))

// getAll().then(result => console.log(result))
// getByID(1).then(result => console.log(result))
// getByEmail('admin@trials.net').then(result => console.log(result))
// getByAuthenticationKey('').then(result => console.log(result))

// TODO: Test delete function
// delete(id)