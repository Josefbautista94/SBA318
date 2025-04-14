const express = require("express"); // Importing the Express module, essential for building web applications and APIs in Node.js
const app = express(); // creating an instance of the Express application
const postsRoutes = require('./routes/posts') // Importing the routes defined in the posts.js

app.use(express.json()); // Middleware to parse JSON
app.use('/posts', postsRoutes) // mounts the postRoutes middleware at the post path

// Start the server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}!`)
})