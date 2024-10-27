import { setupHamburgerMenu } from './ui/hamburger-menu.js';
import { fetchBlogs, fetchCategories } from './api/fetch-category.js';
import { renderBlogPost } from './ui/render-ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        closeHamburger: document.querySelector('.close-hamburger')
    };

    setupHamburgerMenu(elements);

    const blogPostsContainer = document.getElementById('blog-posts');
    const loadMoreButton = document.getElementById('load-more');
    const categoriesContainer = document.getElementById('categories');
    const postsPerPage = 10;
    let currentPage = 1;
    let selectedCategory = '';
    let allPostsLoaded = false;

    async function loadBlogs() {
        // Only attempt to load more posts if there are still posts to load
        if (allPostsLoaded) return;

        const blogs = await fetchBlogs(currentPage, postsPerPage, selectedCategory);

        if (blogs.length === 0) {
            // If no blogs are returned, all posts have been loaded
            allPostsLoaded = true;
            loadMoreButton.textContent = "No more posts available";
            loadMoreButton.disabled = true;
            loadMoreButton.classList.add('disabled'); // Optional: style to show it's inactive
        } else {
            blogs.forEach(post => renderBlogPost(post, blogPostsContainer));
        }
    }

    async function loadCategories() {
        const categories = await fetchCategories();
        renderCategories(categories);
    }

    function renderCategories(categories) {
        categoriesContainer.innerHTML = '';

        const allCategoriesItem = document.createElement('li');
        allCategoriesItem.textContent = 'All Categories';
        allCategoriesItem.addEventListener('click', () => {
            selectedCategory = '';
            resetBlogPosts();
        });
        categoriesContainer.appendChild(allCategoriesItem);

        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.textContent = category.name;
            categoryItem.addEventListener('click', () => {
                selectedCategory = category.id;
                resetBlogPosts();
            });
            categoriesContainer.appendChild(categoryItem);
        });
    }

    function resetBlogPosts() {
        blogPostsContainer.innerHTML = '';
        currentPage = 1;
        allPostsLoaded = false; // Reset to allow more posts to load after filtering
        loadMoreButton.textContent = "Load More Posts";
        loadMoreButton.disabled = false;
        loadMoreButton.classList.remove('disabled');
        loadBlogs();
    }

    loadMoreButton?.addEventListener('click', async () => {
        currentPage++;
        await loadBlogs();
    });

    loadBlogs();
    loadCategories();
});
