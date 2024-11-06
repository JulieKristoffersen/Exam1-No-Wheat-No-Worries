import { setupHamburgerMenu } from './ui/hamburger-menu.js';
import { fetchBlogs, fetchCategories } from './api/fetch-category.js';
import { renderBlogPost } from './ui/render-ui.js';
import { showLoadingIndicator, hideLoadingIndicator } from './ui/loading-indicator.js';

showLoadingIndicator();

window.addEventListener("load", hideLoadingIndicator);

const elements = {
    hamburger: document.querySelector('.hamburger'),
    navLinks: document.querySelector('.nav-links'),
    closeHamburger: document.querySelector('.close-hamburger'),
    blogPostsContainer: document.getElementById('blog-posts'),
    loadMoreButton: document.getElementById('load-more'),
    categoriesContainer: document.getElementById('categories')
};

setupHamburgerMenu(elements);

const postsPerPage = 10;
let currentPage = 1;
let selectedCategory = '';
let allPostsLoaded = false;

async function loadBlogs() {
    if (allPostsLoaded) return;

    const blogs = await fetchBlogs(currentPage, postsPerPage, selectedCategory);

    if (blogs.length === 0) {
        allPostsLoaded = true;
        elements.loadMoreButton.textContent = "No more posts available";
        elements.loadMoreButton.disabled = true;
        elements.loadMoreButton.classList.add('disabled');
    } else {
        blogs.forEach(post => renderBlogPost(post, elements.blogPostsContainer));
    }
}

async function loadCategories() {
    const categories = await fetchCategories();
    renderCategories(categories);
}

function renderCategories(categories) {
    elements.categoriesContainer.innerHTML = '';

    const allCategoriesItem = document.createElement('li');
    allCategoriesItem.textContent = 'All Categories';
    allCategoriesItem.addEventListener('click', () => {
        selectedCategory = '';
        resetBlogPosts();
    });
    elements.categoriesContainer.appendChild(allCategoriesItem);

    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.textContent = category.name;
        categoryItem.addEventListener('click', () => {
            selectedCategory = category.id;
            resetBlogPosts();
        });
        elements.categoriesContainer.appendChild(categoryItem);
    });
}

function resetBlogPosts() {
    elements.blogPostsContainer.innerHTML = '';
    currentPage = 1;
    allPostsLoaded = false;
    elements.loadMoreButton.textContent = "Load More Posts";
    elements.loadMoreButton.disabled = false;
    elements.loadMoreButton.classList.remove('disabled');
    loadBlogs();
}

elements.loadMoreButton?.addEventListener('click', async () => {
    currentPage++;
    await loadBlogs();
});

loadBlogs();
loadCategories();
