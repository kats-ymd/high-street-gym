import { Router } from "express";
import * as BlogPosts from "../models/blogs.js"
import auth from "../middleware/auth.js";
import validator from "validator"

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

    // Implement request validation
    if (!/^[1-9]\d*$/.test(amount)) {
        res.status(400).json({
            status: 400,
            message: "Invalid request",
        })
        return
    }

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

    // Implement request validation
    if (!/^[1-9]\d*$/.test(page)) {
        res.status(400).json({
            status: 400,
            message: "Invalid request",
        })
        return
    }

    const blogPosts = await BlogPosts.getByPage(page, pageSize);

    res.status(200).json({
        status: 200,
        message: "Get paginated blog posts on page " + page,
        blogPosts: blogPosts,
    })
})

blogController.post("/", auth(["admin", "trainer", "customer"]), (req, res) => {
    // Get the blog post data out of the request
    const blogPostData = req.body

    // Implement request validation
    if (!/^[1-9]\d*$/.test(blogPostData.user_id)) {
        res.status(400).json({
            status: 400,
            message: "Invalid user ID",
        })
        return
    }
    if (!/^.+$/.test(blogPostData.title)) {
        res.status(400).json({
            status: 400,
            message: "No title entered",
        })
        return
    }
    if (!/^.+$/.test(blogPostData.content)) {
        res.status(400).json({
            status: 400,
            message: "No content entered",
        })
        return
    }

    // Convert the blog post data into an Post model object
    const blogPost = BlogPosts.newPost(
        null,
        blogPostData.user_id,
        validator.escape(blogPostData.title),
        validator.escape(blogPostData.content),
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

export default blogController
