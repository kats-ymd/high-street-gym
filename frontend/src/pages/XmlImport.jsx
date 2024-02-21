// import Header from "../components/Header"
// import Nav from "../components/Nav"
// import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import upload from "../assets/img/iconmonstr-upload-18.svg"

function XmlImport () {
    return <>
        {/* <Header /> */}
        <div>
            <img src={upload} alt="upload to cloud icon" className="w-40 my-4 mx-auto" />
            <h1>This is the XML Import page!</h1>
            <form className="flex flex-col gap-y-2">
                <select className="select select-bordered">
                    <option disabled selected>Import Type</option>
                    <option>XML</option>
                    <option>JSON</option>
                    <option>YAML</option>
                </select>
                <input type="file" className="file-input file-input-bordered" />
                <div>
                    <button className="btn">Save</button>
                    <Link to="/" className="btn btn-ghost">Cancel</Link>
                </div>
            </form>
        </div>
        {/* <Nav /> */}
        {/* <Footer /> */}
    </>
}

export default XmlImport