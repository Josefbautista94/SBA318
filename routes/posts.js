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

module.exports = router; // Export the router for use in app.js or server.js
