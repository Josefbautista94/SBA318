const express = require("express")
const app = express();

// Imports the post route

const postsRouter = require('./routes/posts')

// Use the posts route for any requests to /posts
app.use('/posts', postsRouter)

// Start the server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}!`)
})