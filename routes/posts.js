const express = require("express"); // Importing the Express module, essential for building web applications and APIs in Node.js
const router = express.Router(); // Creates a new router object, allowing us to modularize route definitions for better code organization
const posts = require("../data/posts"); // Importing mock post data
const users = require("../data/users"); // Importing mock user data

// GET /posts/new - Show form to create a new post
router.get("/new", (req, res) => {
    res.render("newPost");
  });

// GET all posts (optionally filtered by category)
router.get("/view", (req, res) => {

    console.log("Request received at:", req.requestTime);

    // Object destructuring to extract 'category' from query parameters
    // Example: /posts?category=tech → req.query = { category: 'tech' }
    const { category } = req.query;

    // Initialize filteredPosts with all posts by default
    let filteredPosts = posts;

    // If a category is specified, filter posts by that category
    if (category) {
        filteredPosts = posts.filter(post => post.category === category);
    }

    // Enhance posts with author info
    const enhancedPosts = filteredPosts.map(post => {
        // Find the author in the users array based on userId
        const author = users.find(user => user.id === post.userId);

        return {
            ...post, // Spread the original post properties
            authorName: author ? author.name : "Unknown", // Add author name or fallback
            authorAvatar: author ? author.avatar : "❓" // Add author avatar or fallback emoji
        };
    });

    res.render("posts", { posts: enhancedPosts });

});

// GET a single post by ID
router.get('/:id', (req, res) => {
    const postId = parseInt(req.params.id)// Converts the 'id' parameter from a string to an integer
    const post = posts.find(p => p.id === postId); // Searches the posts array for a post with an id matching postId

    if (!post) { // if no post we respond with a 404 with a message
        return res.status(404).json({ message: "Post Not Found!" })
    }

    const author = users.find(user => user.id === post.userId) // using the find() method to attempt to find the author
    const enhancedPost = {
        ...post, // Spread the original post's properties into a new object
        authorName: author ? author.name : "Unknown",  // Add author name or fallback
        authorAvatar: author ? author.avatar : "❓" // Add author avatar or fallback emoji
    }

    res.json(enhancedPost)
});

// POST creating a new blog post
router.post("/", (req, res) => { // Used to create new resources—in this case, a new blog post.

    const { title, content, category, userId } = req.body; // Using object destructuring to extract title, content, category and userID from the request body

    // Basic validation   
    if (!title || !content || !userId) { // If any of these are missing it responds with a 400 bas request
        return res.status(400).json({ message: "Title, Content, and UserId are required!" })
    }

    // Generating a new unique Id
    const newId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1; //Generates a unique ID for the new post. If the posts array has existing entries, it finds the maximum current ID and adds 1. If the array is empty, it starts with ID 1.

    const newPost = { // Creating a new post object
        id: newId,
        title,
        content,
        category: category || "general", // Default category if not provided
        userId,
        createdAt: new Date().toISOString()
    };

    posts.push(newPost); // adding new post to post array

    res.status(201).json(newPost); // This confirms successful creation to the user.​
});

// PATCH /posts/:id - Update an existing post
router.patch("/:id", (req, res) => { // Sets up a dynamic route that listens to /posts/:id

    const postId = parseInt(req.params.id); // Converts the route id param from a string to a number
    const post = posts.find(p => p.id === postId); // Looks up the post by id. Good use of find()



    if (!post) { // error handling if no post is found.
        return res.status(404).json({ message: "Post not found!" })
    }

    const { title, content, category } = req.body; // Uses destructuring to pull out just what you might want to update

    // only updating fields that were sent in
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (category !== undefined) post.category = category;

    res.json(post); // Sends back the updated post 

})

// DELETE /posts/:id - Delete a specific post by ID
router.delete("/:id", (req, res) => { // sets up a route to handle DELETE requests at /posts/:id

    const postId = parseInt(req.params.id); // retrieves the id parameter from the URL and converts it to an integer
    const index = posts.findIndex(p => p.id === postId); // searches for the index of the post with the matching ID in the posts array

    if (index === -1) { // If findIndex returns -1, it means the post wasn't found, the server responds with a 404 status
        return res.status(404).json({ message: "Post not found!" });
    }

    posts.splice(index, 1);   //  removes the post from the posts array at the found index

    res.json({ message: "The post was deleted successfully!" }) // sends a JSON response confirming the deletion

})

// Additional routes for creating, updating, and deleting posts will be added here!


module.exports = router; // Export the router for use in app.js or server.js
