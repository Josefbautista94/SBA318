# SBA318
# 📝 BlogVerse - A Full-Stack Express Blog App

**BlogVerse** is a full-stack blog API and UI built with **Express.js** and **EJS**. It allows users to create, view, edit, and delete blog posts — complete with user info, comments, and a clean dark mode interface.

---

## 🚀 Features

- RESTful API with full CRUD operations  
- Three data models: **Users**, **Posts**, and **Comments**  
- Category filtering with query parameters  
- Dark-themed **EJS** views rendered with dynamic data  
- Form-based post and comment creation  
- Middleware for logging and request timing  
- Custom error handling  
- Responsive UI built with custom CSS  
- Clean folder structure for scalability

---

## 📂 Project Structure

. ├── data/ # Mock data for posts, users, comments
├── middleware/ # Custom and error-handling middleware
├── routes/ # Modular route files for posts and comments
├── views/ # EJS templates and partials
├── public/ # Static assets (CSS)
├── server.js # Main Express application
└── README.md


---

## 🧪 How to Run

1. **Clone the repo:**

```
git clone <your-repo-url>
cd blogverse

Install dependencies:

npm install

Start the server:

node server.js

Visit in your browser:

http://localhost:3000

🔧 Routes Overview
📬 Posts
GET /posts – Get all posts (optionally filter with ?category=)

GET /posts/:id – Get single post by ID

GET /posts/view – View posts with EJS

GET /posts/new – Form to create new post

POST /posts – Create a new post

PATCH /posts/:id – Update a post

DELETE /posts/:id – Delete a post

💬 Comments
GET /comments – Get all comments (optionally filter with ?postId=)

POST /comments – Add a new comment

🔮 What's Next?
Planned enhancements:

Displaying comments under each post

Adding usernames dynamically from userId

AJAX-based comment submission

Form validation feedback

Real database integration (MongoDB or PostgreSQL)

🙌 Author
Jose Bautista
Crafted with grit, caffeine and lofi
