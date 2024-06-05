import { useNavigate, Link } from "react-router-dom"
import { useRef, useState } from "react"
import { API_URL } from "../api/api"
import { useAuthentication } from "../hooks/authentication";
import upload from "../assets/img/iconmonstr-upload-18.svg"

function XmlImport({ /* onUploadSuccess,*/ uploadUrl, disabled = false }) {
    const navigate = useNavigate()

    const [user] = useAuthentication()

    const [uploadOption, setUploadOption] = useState("")

    const [statusMessage, setStatusMessage] = useState("")

    // useRef is the react way of getting an element reference like below:
    // const uploadInput = document.getElementById("file-input")
    const uploadInputRef = useRef(null);

    function uploadFile(e) {
        e.preventDefault()

        if (uploadOption == "") {
            setStatusMessage("Select import type from select box...")
            return
        }

        // Files is an array because the user could select multiple files
        // we choose to upload only the first selected file in this case.
        const file = uploadInputRef.current.files[0];

        // Fetch expects multi-part form data to be provided
        // inside a FormData object.
        const formData = new FormData()
        formData.append("xml-file", file)

        if (uploadOption == "upload-classes") {
            uploadUrl = '/classes/upload-xml'
        } else if (uploadOption == "upload-users") {
            uploadUrl = '/users/upload-xml'
        }

        fetch(API_URL + uploadUrl,
            {
                method: "POST",
                headers: {
                    'X-AUTH-KEY': user.authenticationKey
                },
                body: formData,
            })
            .then(res => res.json())
            .then(APIResponse => {
                setStatusMessage(APIResponse.message)
                setUploadOption("")
                // clear the selected file
                uploadInputRef.current.value = null
            })
            .catch(error => {
                setStatusMessage("Upload failed - " + error)
            })
    }

    function handleOnChange(e) {
        // console.log(e.target.value)
        setUploadOption(e.target.value)
    }

    return <>
        <div className="mx-4">
            {/* <h1 className="text-2xl">XML Import</h1> */}
            <img src={upload} alt="upload to cloud icon" className="w-40 my-4 mx-auto" />
            <form className="flex flex-col gap-y-2" onSubmit={uploadFile}>
                <select
                    onChange={(e) => handleOnChange(e)}
                    value={uploadOption}
                    className="select select-bordered"
                >
                    <option value="" disabled selected>Import Type</option>
                    <option value="upload-classes">upload-classes.xml</option>
                    <option value="upload-users">upload-users.xml</option>
                </select>
                <input
                    ref={uploadInputRef}
                    type="file"
                    disabled={disabled}
                    className="file-input file-input-bordered" />
                <div className="flex flex-wrap">
                    <button
                        disabled={disabled}
                        className="btn flex-grow">Save</button>
                    <button
                        onClick={() => navigate("/bookings")}
                        className="btn btn-ghost flex-grow">Cancel</button>
                </div>
                <label className="label">
                    <span className="text-base text-red-600">{statusMessage}</span>
                </label>
                <div className="py-2">
                    <ul className="list-disc list-inside">
                        Please refer to the Reference List below for the following:
                        <li className="px-4">Trainer ID</li>
                        <li className="px-4">Activity ID</li>
                        <li className="px-4">Location ID</li>
                    </ul>
                    <Link
                        to={"/referenceList"}
                        target="_blank"
                        className="btn"
                    >Reference List</Link>
                </div>
            </form>
        </div>
    </>
}

export default XmlImport
