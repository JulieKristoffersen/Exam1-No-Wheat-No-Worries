document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts');
    const loadMoreButton = document.getElementById('load-more');
    let postsPerPage = 10;
    let currentPage = 1;

    // Function to fetch blogs from the API
    async function fetchBlogs(page = 1, limit = 10) {
        const response = await fetch(`https://julnys.no/wp-json/wp/v2/posts?page=${page}&per_page=${limit}`);
        
        // Check if the response is okay
        if (!response.ok) {
            console.error('Failed to fetch posts', response.status);
            return [];
        }
        
        return await response.json();
    }

    // Function to render blog posts
    function renderBlogPost(post) {
        const blogPost = document.createElement('div');
        blogPost.classList.add('blog-post');
        blogPost.innerHTML = `
            <h2>${post.title.rendered}</h2>
            <p>${post.excerpt.rendered}</p>
            <a href="${post.link}" target="_blank">Read More</a>
        `;
        blogPostsContainer.appendChild(blogPost);
    }

    // Load the first 10 blogs initially
    async function loadBlogs() {
        const blogs = await fetchBlogs(currentPage, postsPerPage);

        // Check if blogs is an array and iterate through it
        if (Array.isArray(blogs)) {
            blogs.forEach(renderBlogPost);
        } else {
            console.error('Unexpected response structure', blogs);
        }
    }

    // Load more posts when the button is clicked
    loadMoreButton.addEventListener('click', async () => {
        currentPage++;
        const moreBlogs = await fetchBlogs(currentPage, postsPerPage);

        // Check if moreBlogs is an array and iterate through it
        if (Array.isArray(moreBlogs)) {
            moreBlogs.forEach(renderBlogPost);
        } else {
            console.error('Unexpected response structure', moreBlogs);
        }
    });

    // Initial load
    loadBlogs();
});
