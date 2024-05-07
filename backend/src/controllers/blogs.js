import { Router } from "express";
import * as BlogPosts from "../models/blogs.js"
import auth from "../middleware/auth.js";

// TODO: Implement input validation

const blogController = Router()

blogController.get("/", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const blogPosts = await BlogPosts.getAll()

    res.status(200).json({
        status: 200,
        message: "Get all blog posts",
        blogPosts: blogPosts,
    })
})

blogController.get("/top/:amount", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const amount = parseInt(req.params.amount)

    // TODO: Implement request validation

    const blogPosts = await BlogPosts.getTop(amount)

    res.status(200).json({
        status: 200,
        message: "Get top blog posts",
        blogPosts: blogPosts,
    })
})

blogController.get("/page/:page", auth(["admin", "trainer", "customer"]), async (req, res) => {
    const pageSize = 5;
    const page = parseInt(req.params.page);

    // TODO: Implement request validation

    const blogPosts = await BlogPosts.getByPage(page, pageSize);

    res.status(200).json({
        status: 200,
        message: "Get paginated blog posts on page " + page,
        blogPosts: blogPosts,
    })
})

// blogController.get("/user/:id", async (req, res) => {
//     const userID = req.params.id

//     // TODO: Implement request validation

//     const sightings = await Sightings.getByUserID(userID)

//     res.status(200).json({
//         status: 200,
//         message: "Get all sightings by user ID",
//         sightings: sightings,
//     })
// })

// sightingController.get("/:id", (req, res) => {
//     const sightingID = req.params.id

//     // TODO: Implement request validation

//     Sightings.getByID(sightingID).then(sighting => {
//         res.status(200).json({
//             status: 200,
//             message: "Get sighting by ID",
//             sighting: sighting
//         })
//     }).catch(error => {
//         res.status(500).json({
//             status: 500,
//             message: "Failed to get sighting by ID",
//         })
//     })
// })

blogController.post("/", auth(["admin", "trainer", "customer"]), (req, res) => {
    // Get the blog post data out of the request
    const blogPostData = req.body

    // TODO: Implement request validation

    // Convert the blog post data into an Post model object
    const blogPost = BlogPosts.newPost(
        null,
        blogPostData.user_id,
        blogPostData.title,
        blogPostData.content,
        "", // updated_at, auto-inserted by database
        "", // first_name, ignored when inserted into database as user_id is provided
        "", // last_name, ignored when inserted into database as user_id is provided
    )

    // Use the create model function to insert this blog post into the DB
    BlogPosts.create(blogPost).then(blogPost => {
        res.status(200).json({
            status: 200,
            message: "Created blog post",
            blogPost: blogPost,
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Failed to create blog post",
        })
    })
})

// sightingController.delete("/:id", auth(["admin", "moderator", "spotter"]), (req, res) => {
//     const sightingID = req.params.id

//     // TODO: Implement request validation

//     // TODO: If the role is spotter then we should also check that
//     // the sighting they are deleting was created by them.

//     res.status(200).json({
//         status: 200,
//         message: "Delete sighting by ID - Not yet implemented",
//     })
// })

export default blogController
