import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Users from "../api/users"
import { useAuthentication } from "../hooks/authentication"
import profile from "../assets/img/iconmonstr-user-circle-thin.svg"

function Profile ({ userID, onSave, allowEditRole }) {
    const navigate = useNavigate()

    const [user, , , refresh] = useAuthentication()

    // Load the logged in user's data in the input fields
    const [formData, setFormData] = useState({...user})

    const [statusMessage, setStatusMessage] = useState("")

    // Load selected user provided in userID prop
    useEffect(() => {
        if (user) {
            Users.getUserByID(user.id, user.authenticationKey).then(user => {
                setFormData(user)
            })
        }
    }, [user])

    // Clears the currently loaded user data from the form
    function clear() {
        setFormData({
            id: null,
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            email: "",
            password: "",
            authenticationKey: null,
        })
        setStatusMessage("")
    }

    // Updates or inserts a new user based on if the user
    // has an ID or not yet.
    function upsert() {
        if (formData.id) {
            // The user in the form has an ID which implies they
            // already exist in the database. Therefore we update.
            setStatusMessage("Updating user...")
            Users.update(formData, user.authenticationKey).then(result => {
                setStatusMessage(result.message)

                if (typeof onSave === "function") {
                    onSave()
                }

                // If the user is updating them self then we should refresh
                // their local data from the server. (this shows the effects
                // of the change in places like the navigation bar without a page reload)
                if (formData.id == user.id) {
                    refresh();
                }
            })
        } else {
            // The user in the form doesn't have an ID which implies they
            // DO NOT exist in the database. Therefore we create.
            setStatusMessage("Creating user...")
            Users.create(formData, user.authenticationKey).then(result => {
                setStatusMessage(result.message)

                if (typeof onSave === "function") {
                    onSave()
                }

                // We also need to set the users new ID in form
                // in case the they are immediately updated after being
                // created.
                setFormData((existing) => ({ ...existing, id: result.user.id }))
            })
        }
    }

    return <>
        <div>
            <h1 className="text-2xl">User Profile</h1>
            <img
                src={profile}
                alt="user image placeholder"
                className="w-40 my-4 mx-auto"
            />
            <form className="flex flex-col gap-y-2">
                <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered"
                    value={formData.firstName}
                    onChange={(e) => setFormData(existing => { return { ...existing, firstName: e.target.value } })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered"
                    value={formData.lastName}
                    onChange={(e) => setFormData(existing => { return { ...existing, lastName: e.target.value } })}
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    className="input input-bordered"
                    value={formData.phone}
                    onChange={(e) => setFormData(existing => { return { ...existing, phone: e.target.value } })}
                />
                <input
                    type="text"
                    placeholder="Address"
                    className="input input-bordered"
                    value={formData.address}
                    onChange={(e) => setFormData(existing => { return { ...existing, address: e.target.value } })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    value={formData.email}
                    onChange={(e) => setFormData(existing => { return { ...existing, email: e.target.value } })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                    value={formData.password}
                    onChange={(e) => setFormData(existing => { return { ...existing, password: e.target.value } })}
                />
                {/* TODO: showing hashed password may be NG, if "update" again, the saved password would be changed unexpectedly */}
                <div>
                    <input
                        type="button"
                        value={formData.id ? "Update" : "Insert"}
                        onClick={() => upsert()}
                        className="btn btn-primary mr-2"
                    />
                    <button onClick={() => navigate("/bookings")} className="btn btn-ghost">Cancel</button>
                    {/* TODO: maybe change function to go back to the previous page instead of bookings page */}
                </div>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </form>
        </div>
    </>
}

export default Profile
