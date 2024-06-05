import { useEffect, useState } from "react"
import { useAuthentication } from "../hooks/authentication"
import * as BlogPosts from "../api/blogs"
// import { Link } from "react-router-dom"
import personIcon from "../assets/img/iconmonstr-user-circle-thin.svg"
import LoadingSpinner from "../components/LoadingSpinner"

function Blog () {
    const [user, , , ] = useAuthentication()

    const [formData, setFormData] = useState({
        user_id: "",
        title: "",
        content: "",
    })

    const [statusMessage, setStatusMessage] = useState("")

    // Load blog posts timeline
    const [blogPosts, setBlogPosts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (user) {
            BlogPosts.getAll(user.authenticationKey).then(result => {
                setBlogPosts(result)
                setLoading(false)
            })
            .catch((error) => console.error("Error fetching blogs:", error))
        }
    }, [user, blogPosts])

    // Clears the currently loaded form data
    function clear() {
        setFormData({
            user_id: "",
            title: "",
            content: "",
        })
        setStatusMessage("")
    }

    function addBlogPost(e) {
        e.preventDefault()
        setStatusMessage("Creating new post...")

        // Add user_id to the post object before sending
        const newPostData = {
            ...formData,
            user_id: user.id,
        }

        BlogPosts.create(newPostData, user.authenticationKey).then(result => {
            clear()
            setStatusMessage(result.message)
        })
    }

    // TODO: (optional) Implement "like" feature
    //
    // Reference:
    // MySQLでいいね！（LIKE）機能のDB設計をしてみた！
    // https://hit.hateblo.jp/entry/mysql/iine

    // TODO: (optional) Implement "comment" feature
    // TODO: (optional) Implement "update" feature
    // TODO: (optional) Implement "delete" feature

    return loading ? <LoadingSpinner /> : <>
        {/*
            following twitter-like tailwind component referenced from here:
            https://tailwindcomponents.com/component/twitter-clone
        */}
        <div className="mx-1">
            <h1 className="pb-2 text-2xl">Gym Blog!</h1>
            {/* create tweet */}
            <div className="flex border-y-2 border-gray-400">
                <div className="m-2 w-10 py-1">
                    <img className="inline-block h-10 w-10 rounded-full" src={personIcon} alt="placeholder icon for user profile image" />
                </div>
                <form className="flex-1 px-2 pt-2 mt-2 flex flex-col gap-2" onSubmit={addBlogPost}>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(existing => { return { ...existing, title: e.target.value } })}
                        className="input input-bordered w-full"
                        placeholder="post title"
                    />
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData(existing => { return { ...existing, content: e.target.value } })}
                        className="textarea textarea-bordered w-full"
                        rows="2" cols="50"
                        placeholder="What's up?"
                    ></textarea>
                    <div className="flex">
                        <button className="basis-1/2 btn">Post!</button>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                clear()
                            }}
                            className="basis-1/2 btn btn-ghost">Clear</button>
                    </div>
                    <label className="label">
                        <span className="text-base text-red-600">{statusMessage}</span>
                    </label>
                </form>
            </div>
            {/* create tweet below icons */}
            {/* <div className="flex">
                <div className="w-10"></div>
                <div className="w-64 px-2">
                    <div className="flex items-center">
                        <div className="flex-1 text-center px-1 py-1 m-2">
                            <a href="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </a>
                        </div>

                        <div className="flex-1 text-center py-2 m-2">
                            <a href="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </a>
                        </div>

                        <div className="flex-1 text-center py-2 m-2">
                            <a href="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </a>
                        </div>

                        <div className="flex-1 text-center py-2 m-2">
                            <a href="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <button className="bg-blue-400 mt-5 hover:bg-blue-600  font-bold py-2 px-8 rounded-full mr-8 float-right">
                        Tweet
                    </button>
                </div>
            </div> */}

            {/* timeline of posts start here */}
            {blogPosts.map(blogPost =>
                <div key={blogPost.post_id} className="border-b-2 border-dotted border-gray-400">
                    <div className="flex flex-shrink-0 p-4 pb-0">
                        <a href="#" className="flex-shrink-0 group block">
                            <div className="flex items-center">
                                <div>
                                    <img className="inline-block h-10 w-10 rounded-full" src={personIcon} alt="placeholder icon for user profile image" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-base leading-6 font-medium ">
                                        {blogPost.first_name} {blogPost.last_name}
                                        <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                        &nbsp;&nbsp;@{blogPost.updated_at}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="pl-16 pb-4">
                        <h2 className="text-base width-auto font-bold flex-shrink">
                            {blogPost.title}
                        </h2>
                        <p className="text-base width-auto flex-shrink">
                            {blogPost.content}
                        </p>
                    </div>
                    {/* <hr className="border-gray-600" /> */}
                </div>
            )}

            {/* <!--first example tweet start--> */}
            {/* <div className="flex flex-shrink-0 p-4 pb-0">
                <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                        <div>
                            <img className="inline-block h-10 w-10 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
                        </div>
                        <div className="ml-3">
                            <p className="text-base leading-6 font-medium ">
                                Sonali Hirave
                                <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    @ShonaDesign . 16 April
                                </span>
                            </p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="pl-16">
                <p className="text-base width-auto font-medium  flex-shrink">
                    Day 07 of the challenge <span className="text-blue-400">#100DaysOfCode</span>
                    I was wondering what I can do with <span className="text-blue-400">#tailwindcss</span>, so just started building Twitter  UI using Tailwind and so far it looks so promising. I will post my code after completion.
                    [07/100]
                    <span className="text-blue-400"> #WomenWhoCode #CodeNewbie</span>
                </p>
                <div className="flex">
                    <div className="w-full">
                        <div className="flex items-center">
                            <div className="flex-1 text-center">
                                <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    <svg className="text-center h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                </a>
                            </div>

                            <div className="flex-1 text-center py-2 m-2">
                                <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                                </a>
                            </div>

                            <div className="flex-1 text-center py-2 m-2">
                                <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </a>
                            </div>

                            <div className="flex-1 text-center py-2 m-2">
                                <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                </a>
                            </div>
                            <div className="flex-1 text-center py-2 m-2">
                                <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
                                </a>
                            </div>
                            <div className="flex-1 text-center py-2 m-2">
                                <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-gray-600" /> */}
        </div>
    </>
}

export default Blog
