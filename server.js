const express = require("express"); // Importing the Express module
const app = express(); // Creating an instance of the Express app
app.set("view engine", "ejs");
const postsRoutes = require('./routes/posts'); // Importing post routes
const commentsRoutes = require('./routes/comments');
const logger = require("./middleware/loggerMiddleware");
const requestTime = require("./middleware/requestTimeMiddleware");
const errorHandler = require('./middleware/errorHandler');

// 🔧 Custom middleware
app.use(logger);
app.use(requestTime);
app.use(express.static("public")); // Serve static files (e.g., CSS)
app.use(express.json()); // Middleware to parse incoming JSON
app.use(express.urlencoded({ extended: true })); //This line tells Express to automatically parse form submissions, Required if you want to handle HTML form submissions (POST forms) 




// 📦 Mounted routes
app.use('/posts', postsRoutes);
app.use("/comments", commentsRoutes);
app.get("/", (req, res) => {
    res.render("index"); // this will render views/index.ejs
  });
  

// ❌ Fallback error handler (MUST come after routes!!)
app.use(errorHandler);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}!`);
});