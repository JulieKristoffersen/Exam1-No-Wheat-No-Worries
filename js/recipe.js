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

    async function loadBlogs() {
        const blogs = await fetchBlogs(currentPage, postsPerPage, selectedCategory);
        blogs.forEach(post => renderBlogPost(post, blogPostsContainer));
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
        loadBlogs();
    }

    loadMoreButton?.addEventListener('click', async () => {
        currentPage++;
        await loadBlogs();
    });

    loadBlogs();
    loadCategories();
});
