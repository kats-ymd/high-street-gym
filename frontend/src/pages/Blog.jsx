import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
// import { Link } from "react-router-dom"

function Blog () {
    return <>
        <div className="mx-auto">
            <Header />
            <div className="w-5/6">
                <h1>This is the mini blog page!</h1>
            </div>
            <Nav />
            <Footer />
        </div>
    </>
}

export default Blog