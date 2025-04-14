const express = require("express"); // Importing the Express module, essential for building web applications and APIs in Node.js
const router = express.Router(); // Creates a new router object, allowing us to modularize route definitions for better code organization
const posts = require("../data/posts"); // Importing mock post data
const users = require("../data/users"); // Importing mock user data

// GET all posts (optionally filtered by category)
router.get('/', (req, res) => {
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

    // Send the enhanced posts back as JSON
    res.json(enhancedPosts);
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


router.post("/", (req, res)=> {

    const { title, content, category, userId} = req.body;





})

// Additional routes for creating, updating, and deleting posts will be added here!


module.exports = router; // Export the router for use in app.js or server.js
