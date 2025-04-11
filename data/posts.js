// Array of blog post objects. Each post includes:
// - id: unique identifier
// - title: headline of the blog post
// - content: the actual written post
// - category: to filter posts by topic (e.g., "tech", "anime", etc.)
// - userId: references the author from the users array
// - date: for sorting and displaying post date

const posts = [

    {
        id:1,
        title: "Why I Still use React",
        content: "Even Though everyone says its old 🥺",
        category : "Tech",
        userId : 1,
        date : "2023-04-11"
    },
        {
            id: 2,
            title: "Naruto Fumbled the Bag",
            content: "Let's talk about Boruto for a second.",
            category: "Anime",
            userId: 2,
            date: "2025-04-10"
          }
        ];

        module.exports = posts;