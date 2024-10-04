document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts');
    const loadMoreButton = document.getElementById('load-more');
    const categoriesContainer = document.getElementById('categories');
    let postsPerPage = 10;
    let currentPage = 1;
    let selectedCategory = ''; 

    async function fetchBlogs(page = 1, limit = 10, category = '') {
        let url = `https://julnys.no/wp-json/wp/v2/posts?page=${page}&per_page=${limit}`;
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
        if (!imageId) return 'default-image.jpg'; 
        const response = await fetch(`https://julnys.no/wp-json/wp/v2/media/${imageId}`);
        const imageData = await response.json();
        return imageData.source_url; 
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
        blogPostsContainer.appendChild(blogPost);
    }

    async function fetchCategories() {
        const response = await fetch('https://julnys.no/wp-json/wp/v2/categories');
        if (!response.ok) {
            console.error('Failed to fetch categories', response.status);
            return [];
        }
        return await response.json();
    }

    function renderCategories(categories) {
        categoriesContainer.innerHTML = '';

        const allCategoriesItem = document.createElement('li');
        allCategoriesItem.textContent = 'All Categories';
        allCategoriesItem.addEventListener('click', () => {
            selectedCategory = ''; 
            blogPostsContainer.innerHTML = ''; 
            currentPage = 1; 
            loadBlogs(); 
        });
        categoriesContainer.appendChild(allCategoriesItem);

        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.textContent = category.name;
            categoryItem.addEventListener('click', () => {
                selectedCategory = category.id;
                blogPostsContainer.innerHTML = ''; 
                currentPage = 1; 
                loadBlogs(); 
            });
            categoriesContainer.appendChild(categoryItem);
        });
    }

    async function loadBlogs() {
        const blogs = await fetchBlogs(currentPage, postsPerPage, selectedCategory);

        if (Array.isArray(blogs)) {
            for (const post of blogs) {
                await renderBlogPost(post);
            }
        } else {
            console.error('Unexpected response structure', blogs);
        }
    }

    loadMoreButton.addEventListener('click', async () => {
        currentPage++;
        const moreBlogs = await fetchBlogs(currentPage, postsPerPage, selectedCategory);

        if (Array.isArray(moreBlogs)) {
            for (const post of moreBlogs) {
                await renderBlogPost(post);
            }
        } else {
            console.error('Unexpected response structure', moreBlogs);
        }
    });

    async function loadCategories() {
        const categories = await fetchCategories();
        renderCategories(categories);
    }

    loadBlogs();
    loadCategories();
});
