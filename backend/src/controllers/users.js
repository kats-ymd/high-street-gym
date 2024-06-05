import { Router } from "express";
import bcrypt from "bcrypt" // reference project uses import from "bcryptjs" and causing error
import { v4 as uuid4 } from "uuid"
import xml2js from "xml2js"
import * as Users from "../models/users.js";
import auth from "../middleware/auth.js";
import validator from "validator";

// TODO: Implement input validation
// TODO: Implement input sanitization

const userController = Router()

userController.post("/login", (req, res) => {
    // access request body
    let loginData = req.body

    // Implement request validation
    if (!/^[a-zA-Z0-9.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/.test(loginData.email)) {
        res.status(400).json({
            status: 400,
            message: "Invalid email address",
        })
        return
    }
    if (!/^[^\s]+$/.test(loginData.password)) {
        res.status(400).json({
            status: 400,
            message: "Invalid password: it cannot be empty or contain spaces",
        })
        return
    }

    // console.log(loginData)

    Users.getByEmail(loginData.email)
        .then(user => {
            if (bcrypt.compareSync(loginData.password, user.password)
                || loginData.password == user.password  // DEV ONLY: added this OR for enabling both hashed & non-hashed pwd
            ) {
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

userController.get("/:id", auth(["admin", "trainer", "customer"]), (req, res) => {
    const userID = req.params.id

    // Implement request validation
    if (!/^[1-9]\d*$/.test(userID)) {
        res.status(400).json({
            status: 400,
            message: "Invalid request",
        })
        return
    }

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

userController.get("/role/:role", auth(["admin", "trainer", "customer"]), (req, res) => {
    const role = req.params.role

    if (role != "admin" && role != "trainer" && role != "customer") {
        res.status(400).json({
            status: 400,
            message: "Invalid request",
        })
        return
    }

    Users.getByRole(role).then(user => {
        res.status(200).json({
            status: 200,
            message: "Get user by role",
            user: user,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get user by role",
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

    // Implement request validation
    if (userData.role != "admin" && userData.role != "trainer" && userData.role != "customer") {
        res.status(400).json({
            status: 400,
            message: "Invalid user role",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+$/.test(userData.firstName)) {
        res.status(400).json({
            status: 400,
            message: "Invalid first name",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+$/.test(userData.lastName)) {
        res.status(400).json({
            status: 400,
            message: "Invalid last name",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+$/.test(userData.phone)) {
        res.status(400).json({
            status: 400,
            message: "Invalid phone number",
        })
        return
    }
    if (!/^[a-zA-Z0-9.,-\s]+$/.test(userData.address)) {
        res.status(400).json({
            status: 400,
            message: "Invalid address",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/.test(userData.email)) {
        res.status(400).json({
            status: 400,
            message: "Invalid email address",
        })
        return
    }
    if (!/^[^\s]+$/.test(userData.password)) {
        res.status(400).json({
            status: 400,
            message: "Invalid password: it cannot be empty or contain spaces",
        })
        return
    }

    // hash the password if it isn't already hashed
    if (userData.password
        && (!userData.password.startsWith("$2a")
            && !userData.password.startsWith("$2b")
        )
        // added condition $2b for newer version bcrypt hashes
    ) {
        userData.password = bcrypt.hashSync(userData.password, 10);
        // userData.password = bcrypt.hashSync(userData.password);
        // referenced code would cause error "data and salt arguments required"
        // because hash() or hashSync() requires salt rounds as well, but was missing...
    }

    // Convert the user data into an User model object
    const user = Users.newUser(
        null,
        userData.email,
        userData.password,
        userData.role,
        userData.firstName,
        userData.lastName,
        userData.phone,
        userData.address,
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

    // Implement request validation
    if (!/^[a-zA-Z0-9.-]+$/.test(userData.firstName)) {
        res.status(400).json({
            status: 400,
            message: "Invalid first name",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+$/.test(userData.lastName)) {
        res.status(400).json({
            status: 400,
            message: "Invalid last name",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+$/.test(userData.phone)) {
        res.status(400).json({
            status: 400,
            message: "Invalid phone number",
        })
        return
    }
    if (!/^[a-zA-Z0-9.,-\s]+$/.test(userData.address)) {
        res.status(400).json({
            status: 400,
            message: "Invalid address",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/.test(userData.email)) {
        res.status(400).json({
            status: 400,
            message: "Invalid email address",
        })
        return
    }
    if (!/^[^\s]+$/.test(userData.password)) {
        res.status(400).json({
            status: 400,
            message: "Invalid password: it cannot be empty or contain spaces",
        })
        return
    }

    // hash the password
    userData.password = bcrypt.hashSync(userData.password, 10);
    // userData.password = bcrypt.hashSync(userData.password);
    // referenced code causing error "data and salt arguments required"
    // because hash() or hashSync() requires salt rounds as well, but was missing...

    // Convert the user data into an User model object
    const user = Users.newUser(
        null,
        userData.email,
        userData.password,
        "customer",
        userData.firstName,
        userData.lastName,
        userData.phone,
        userData.address,
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

userController.patch("/:id", auth(["admin", "trainer", "customer"]), async (req, res) => {
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

    // Implement request validation
    if (userData.role != "admin" && userData.role != "trainer" && userData.role != "customer") {
        res.status(400).json({
            status: 400,
            message: "Invalid user role",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+$/.test(userData.firstName)) {
        res.status(400).json({
            status: 400,
            message: "Invalid first name",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+$/.test(userData.lastName)) {
        res.status(400).json({
            status: 400,
            message: "Invalid last name",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+$/.test(userData.phone)) {
        res.status(400).json({
            status: 400,
            message: "Invalid phone number",
        })
        return
    }
    if (!/^[a-zA-Z0-9.,-\s]+$/.test(userData.address)) {
        res.status(400).json({
            status: 400,
            message: "Invalid address",
        })
        return
    }
    if (!/^[a-zA-Z0-9.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/.test(userData.email)) {
        res.status(400).json({
            status: 400,
            message: "Invalid email address",
        })
        return
    }
    if (!/^[^\s]+$/.test(userData.password)) {
        res.status(400).json({
            status: 400,
            message: "Invalid password: it cannot be empty or contain spaces",
        })
        return
    }

    // hash the password if it isn't already hashed
    if (userData.password
        && (!userData.password.startsWith("$2a")
            && !userData.password.startsWith("$2b")
        )
        // added condition $2b for newer version bcrypt hashes
    ) {
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
        userData.phone,
        userData.address,
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

userController.post("/upload-xml", auth(["admin", "trainer"]), (req, res) => {
    if (req.files && req.files["xml-file"]) {
        // Access the XML file as a string
        const XMLFile = req.files["xml-file"]
        const file_text = XMLFile.data.toString()

        // Set up XML parser
        const parser = new xml2js.Parser();
        parser.parseStringPromise(file_text)
            .then(data => {
                const userUpload = data["upload-users"]
                const userUploadAttributes = userUpload["$"]
                const operation = userUploadAttributes["operation"]
                // Slightly painful indexing to reach nested children
                const usersData = userUpload["users"][0]["user"]

                if (operation == "insert") {
                    Promise.all(usersData.map((userData) => {
                        // Convert the xml object into a model object
                        const userModel = Users.newUser(
                            null,
                            userData.email.toString(),
                            bcrypt.hashSync(userData.password.toString(), 10),
                            userData.role.toString(),
                            userData["first-name"].toString(),
                            userData["last-name"].toString(),
                            userData.phone.toString(),
                            userData.address.toString(),
                            null,
                        )

                        // Return the promise of each creation query
                        return Users.create(userModel)

                    })).then(results => {
                        res.status(200).json({
                            status: 200,
                            message: "XML Upload insert successful",
                        })
                    }).catch(error => {
                        res.status(500).json({
                            status: 500,
                            message: "XML upload failed on database operation - " + error,
                        })
                    })

                } else if (operation == "update") {
                    Promise.all(usersData.map((userData) => {
                        // Convert the xml object into a model object
                        const userModel = Users.newUser(
                            userData.id.toString(),
                            userData.email.toString(),
                            bcrypt.hashSync(userData.password.toString(), 10),
                            userData.role.toString(),
                            userData["first-name"].toString(),
                            userData["last-name"].toString(),
                            userData.phone.toString(),
                            userData.address.toString(),
                            null,
                        )

                        // Return the promise of each creation query
                        return Users.update(userModel)

                    })).then(results => {
                        res.status(200).json({
                            status: 200,
                            message: "XML Upload update successful",
                        })
                    }).catch(error => {
                        res.status(500).json({
                            status: 500,
                            message: "XML upload failed on database operation - " + error,
                        })
                    })

                } else {
                    res.status(400).json({
                        status: 400,
                        message: "XML Contains invalid operation attribute value",
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Error parsing XML - " + error,
                })
            })


    } else {
        res.status(400).json({
            status: 400,
            message: "No file selected",
        })
    }
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
