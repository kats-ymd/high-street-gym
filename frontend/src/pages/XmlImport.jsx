import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

function XmlImport () {
    return <>
        <div className="mx-auto">
            <Header />
            <div className="w-5/6">
                <img src="https://picsum.photos/100/100" alt="upload icon placeholder" className="my-4 mx-auto rotate-45" />
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
            <Nav />
            <Footer />
        </div>
    </>
}

export default XmlImport