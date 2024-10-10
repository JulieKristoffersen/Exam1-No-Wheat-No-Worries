document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts');
    const loadMoreButton = document.getElementById('load-more');
    const categoriesContainer = document.getElementById('categories');
    const postsPerPage = 10; // Set number of posts to load per page
    let currentPage = 1; // Track the current page
    let selectedCategory = ''; // Store selected category ID
    const baseUrl = 'https://julnys.no/wp-json/wp/v2'; // Base URL for API calls

    async function fetchBlogs(page = 1, limit = postsPerPage, category = '') {
        let url = `${baseUrl}/posts?page=${page}&per_page=${limit}`;
        if (category) {
            url += `&categories=${category}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch posts', response.status);
            return [];
        }
        return await response.json();
    }

    async function fetchFeaturedImage(imageId) {
        if (!imageId) return 'default-image.jpg'; // Return default image if no ID
        const response = await fetch(`${baseUrl}/media/${imageId}`);
        if (!response.ok) {
            console.error('Failed to fetch image', response.status);
            return 'default-image.jpg'; // Return default image on error
        }
        const imageData = await response.json();
        return imageData.source_url; // Return the source URL of the image
    }

    async function renderBlogPost(post) {
        const blogPost = document.createElement('div');
        blogPost.classList.add('blog-post');

        const imgSrc = await fetchFeaturedImage(post.featured_media);

        blogPost.innerHTML = `
            <img src="${imgSrc}" alt="${post.title.rendered}" style="width:100%; height:auto; object-fit:cover;">
            <h2>${post.title.rendered}</h2>
            <p>${post.excerpt.rendered}</p>
            <a href="${post.link}" target="_blank">Read More</a>
        `;
        blogPostsContainer.appendChild(blogPost); // Append the blog post to the container
    }

    async function fetchCategories() {
        const response = await fetch(`${baseUrl}/categories`);
        if (!response.ok) {
            console.error('Failed to fetch categories', response.status);
            return [];
        }
        return await response.json(); // Return categories if successful
    }

    function renderCategories(categories) {
        categoriesContainer.innerHTML = ''; // Clear previous categories

        const allCategoriesItem = document.createElement('li');
        allCategoriesItem.textContent = 'All Categories';
        allCategoriesItem.addEventListener('click', () => {
            selectedCategory = ''; // Reset selected category
            resetBlogPosts(); // Reset blog posts
        });
        categoriesContainer.appendChild(allCategoriesItem); // Add "All Categories" option

        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.textContent = category.name;
            categoryItem.addEventListener('click', () => {
                selectedCategory = category.id; // Set selected category ID
                resetBlogPosts(); // Reset blog posts
            });
            categoriesContainer.appendChild(categoryItem); // Add category to the list
        });
    }

    function resetBlogPosts() {
        blogPostsContainer.innerHTML = ''; // Clear previous blog posts
        currentPage = 1; // Reset current page
        loadBlogs(); // Reload blog posts
    }

    async function loadBlogs() {
        const blogs = await fetchBlogs(currentPage, postsPerPage, selectedCategory);
        if (Array.isArray(blogs)) {
            for (const post of blogs) {
                await renderBlogPost(post); // Render each blog post
            }
        } else {
            console.error('Unexpected response structure', blogs);
        }
    }

    loadMoreButton.addEventListener('click', async () => {
        currentPage++; // Increment current page
        const moreBlogs = await fetchBlogs(currentPage, postsPerPage, selectedCategory);
        if (Array.isArray(moreBlogs)) {
            for (const post of moreBlogs) {
                await renderBlogPost(post); // Render each additional blog post
            }
        } else {
            console.error('Unexpected response structure', moreBlogs);
        }
    });

    async function loadCategories() {
        const categories = await fetchCategories();
        renderCategories(categories); // Render fetched categories
    }

    loadBlogs(); // Initial load of blog posts
    loadCategories(); // Initial load of categories
});
