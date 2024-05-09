import { db } from "../database.js";

export function newPost(
    post_id,
    user_id,
    title,
    content,
    created_at,
    updated_at,
    first_name,
    last_name,
) {
    return {
        post_id,
        user_id,
        title,
        content,
        created_at,
        updated_at,
        first_name,
        last_name,
    }
}

export async function getAll() {
    const [allBlogPosts] = await db.query(
        "SELECT blog_posts.post_id, blog_posts.user_id, "
        + "blog_posts.title, blog_posts.content, "
        + "blog_posts.created_at, blog_posts.updated_at, "
        + "users.first_name, users.last_name FROM blog_posts "
        + "INNER JOIN users ON blog_posts.user_id = users.id "
        + "ORDER BY blog_posts.updated_at DESC"
    )

    return await allBlogPosts.map((blogPostResult) =>
        newPost(
            blogPostResult.post_id.toString(),
            blogPostResult.user_id,
            blogPostResult.title,
            blogPostResult.content,
            new Date(blogPostResult.created_at).toLocaleString(),
            new Date(blogPostResult.updated_at).toLocaleString(),
            blogPostResult.first_name,
            blogPostResult.last_name,
        ))
}

export async function getByPage(page, size) {
    // NOTE: page = 0 is the first page

    // Calculate page offset
    const offset = page * size

    // Get the collection of blog posts on a given "page"
    const [paginatedBlogPostResults] = await db.query(
        "SELECT blog_posts.post_id, blog_posts.user_id, "
        + "blog_posts.title, blog_posts.content, "
        + "blog_posts.created_at, blog_posts.updated_at, "
        + "users.first_name, users.last_name FROM blog_posts "
        + "INNER JOIN users ON blog_posts.user_id = users.id "
        + "ORDER BY blog_posts.updated_at DESC LIMIT ?, ?",
        [offset, size]
    )

    // Convert the collection of results into a list of Post objects
    return await paginatedBlogPostResults.map((blogPostResult) =>
        newPost(
            blogPostResult.post_id.toString(),
            blogPostResult.user_id,
            blogPostResult.title,
            blogPostResult.content,
            new Date(blogPostResult.created_at).toLocaleString(),
            new Date(blogPostResult.updated_at).toLocaleString(),
            blogPostResult.first_name,
            blogPostResult.last_name,
        ))
}

export async function getTop(amount) {
    // Get the collection of all posts
    const [allBlogPostsResults] = await db.query(
        "SELECT blog_posts.post_id, blog_posts.user_id, "
        + "blog_posts.title, blog_posts.content, "
        + "blog_posts.created_at, blog_posts.updated_at, "
        + "users.first_name, users.last_name FROM blog_posts "
        + "INNER JOIN users ON blog_posts.user_id = users.id "
        + "ORDER BY blog_posts.updated_at DESC LIMIT ?",
        [amount]
    )
    // Convert the collection of results into a list of Post objects
    return await allBlogPostsResults.map((blogPostResult) =>
        newPost(
            blogPostResult.post_id.toString(),
            blogPostResult.user_id,
            blogPostResult.title,
            blogPostResult.content,
            new Date(blogPostResult.created_at).toLocaleString(),
            new Date(blogPostResult.updated_at).toLocaleString(),
            blogPostResult.first_name,
            blogPostResult.last_name,
        ))
}

export async function create(post) {
    return db.query(
        "INSERT INTO blog_posts "
        + "(user_id, title, content) "
        + "VALUE (?, ?, ?)",
        [
            post.user_id,
            post.title,
            post.content
        ]
        // + "(user_id, title, content, updated_at) "
        // + "VALUE (?, ?, ?, ?)",
        // [
        //     post.user_id,
        //     post.title,
        //     post.content,
        //     new Date().toISOString().slice(0, 19).replace('T', ' ')
        // ]
    ).then(([result]) => {
        return { blog_post_id: result.insertId }
    })
}

// TODO: (future) add update, delete post functions if needed


// Test code below

// const post = newPost(
//     null,
//     2,
//     "first message",
//     "hi everyone! let's have a nice work out to start your day!"
//     )
// create(post).then(result => console.log(result))

// getAll().then(result => console.log(result))
// getByPage(1,1).then(result => console.log(result))
// getTop(2).then(result => console.log(result))
