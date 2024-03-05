import { Router } from "express";
import bcrypt from "bcrypt" // reference project uses import from "bcryptjs" and causing error
import { v4 as uuid4 } from "uuid"
import * as Users from "../models/users.js";
import auth from "../middleware/auth.js";

// TODO: Implement input validation

const userController = Router()

userController.post("/login", (req, res) => {
    // access request body
    let loginData = req.body

    // TODO: Implement request validation

    console.log(loginData)

    Users.getByEmail(loginData.email)
        .then(user => {
            // if (bcrypt.compareSync(loginData.password, user.password)) {
            if (loginData.password == user.password) {

                user.authenticationKey = uuid4().toString()

                Users.update(user).then(result => {
                    res.status(200).json({
                        status: 200,
                        message: "user logged in",
                        authenticationKey: user.authenticationKey,
                    })
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "invalid credentials"
                })

            }
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: 500,
                message: "login failed"
            })
        })
})

userController.post("/logout", (req, res) => {
    const authenticationKey = req.get("X-AUTH-KEY")
    Users.getByAuthenticationKey(authenticationKey)
        .then(user => {
            user.authenticationKey = null
            Users.update(user).then(user => {
                res.status(200).json({
                    status: 200,
                    message: "user logged out"
                })
            })
        }).catch(error => {
            res.status(500).json({
                status: 500,
                message: "failed to logout user"
            })
        })
})


userController.get("/", auth(["admin"]), async (req, res) => {
    const users = await Users.getAll()

    res.status(200).json({
        status: 200,
        message: "User list",
        users: users,
    })
})

userController.get("/:id", auth(["admin", "moderator", "spotter"]), (req, res) => {
    const userID = req.params.id

    // TODO: Implement request validation

    // TODO: Enforce that moderator and spotter users
    // can only get them selves. 

    Users.getByID(userID).then(user => {
        res.status(200).json({
            status: 200,
            message: "Get user by ID",
            user: user,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get user by ID",
        })
    })
})

userController.get("/authentication/:authenticationKey", (req, res) => {
    const authenticationKey = req.params.authenticationKey

    Users.getByAuthenticationKey(authenticationKey).then(user => {
        res.status(200).json({
            status: 200,
            message: "Get user by authentication key",
            user: user,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get user by authentication key",
        })
    })
})

userController.post("/", auth(["admin"]), (req, res) => {
    // Get the user data out of the request
    const userData = req.body.user

    // TODO: Implement request validation

    // hash the password if it isn't already hashed
    if (!userData.password.startsWith("$2a")) {
        userData.password = bcrypt.hashSync(userData.password);
    }

    // Convert the user data into an User model object
    const user = Users.newUser(
        null,
        userData.email,
        userData.password,
        userData.role,
        userData.firstName,
        userData.lastName,
        null
    )

    // Use the create model function to insert this user into the DB
    Users.create(user).then(user => {
        res.status(200).json({
            status: 200,
            message: "Created user",
            user: user
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to create user",
        })
    })
})

userController.post("/register", (req, res) => {
    // Get the user data out of the request
    const userData = req.body

    // TODO: Implement request validation

    // hash the password 
    userData.password = bcrypt.hashSync(userData.password);

    // Convert the user data into an User model object
    const user = Users.newUser(
        null,
        userData.email,
        userData.password,
        "spotter",
        userData.firstName,
        userData.lastName,
        null
    )

    // Use the create model function to insert this user into the DB
    Users.create(user).then(user => {
        res.status(200).json({
            status: 200,
            message: "Registration successful",
            user: user
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Registration failed",
        })
    })
})

userController.patch("/:id", auth(["admin", "moderator", "spotter"]), async (req, res) => {
    // Get the user data out of the request
    //
    // Note - the user data being updated is encapsulated in a user
    // object to avoid ambiguity between the logged in user's
    // authentication key and the authentication key of the user
    // currently being updated.
    const userID = req.params.id
    const userData = req.body.user

    // Use ID passed in URL
    userData.id = userID

    // TODO: Implement request validation

    // TODO: Enforce that moderators and spotters can only
    // update their own user records.

    // hash the password if it isn't already hashed
    if (userData.password && !userData.password.startsWith("$2a")) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Convert the user data into a User model object
    const user = Users.newUser(
        userData.id,
        userData.email,
        userData.password,
        userData.role,
        userData.firstName,
        userData.lastName,
        userData.authenticationKey
    )

    // Use the update model function to update this user in the DB
    Users.update(user).then(user => {
        res.status(200).json({
            status: 200,
            message: "Updated user",
            user: user
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Failed to update user",
        })
    })
})

userController.delete("/:id", auth(["admin"]), (req, res) => {
    const userID = req.params.id

    // TODO: Implement request validation

    Users.deleteByID(userID).then(result => {
        res.status(200).json({
            status: 200,
            message: "User deleted",
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to delete user",
        })
    })
}
)

export default userController
