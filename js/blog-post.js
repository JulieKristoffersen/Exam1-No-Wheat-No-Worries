import { setupHamburgerMenu } from './ui/hamburger-menu.js';
import { fetchBlogById } from './api/fetch-posts.js';
import { setupModal } from './ui/modal.js';
import { showLoadingIndicator, hideLoadingIndicator } from './ui/loading-indicator.js';

showLoadingIndicator();

window.addEventListener("load", hideLoadingIndicator);

const blogElements = {
    blogContent: document.getElementById('blog-content'),
    blogTitle: document.getElementById('blog-title'),
    modal: document.getElementById('modal'),
    modalImage: document.getElementById('modal-image'),
    caption: document.getElementById('caption'),
    closeModal: document.querySelector('.close-modal')
};

function renderPost(blogPost) {
    const featuredImage = blogPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'default-image.jpg';
    
    blogElements.blogTitle.innerText = `No wheat, No worries | ${blogPost.title.rendered}`;
    blogElements.blogContent.innerHTML = `
        <h1>${blogPost.title.rendered}</h1>
        <img src="${featuredImage}" alt="${blogPost.title.rendered}" class="post-image" />
        <div>${blogPost.content.rendered}</div>
    `;

    setupModal(blogElements.modalImage, blogElements);
}

async function loadBlogPost(blogId) {
    const blogPost = await fetchBlogById(blogId);
    if (blogPost) {
        renderPost(blogPost);
    } else {
        blogElements.blogContent.innerHTML = '<p>Post not found.</p>';
    }
}

function getBlogIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

(function init() {
    const blogId = getBlogIdFromUrl();
    if (blogId) {
        loadBlogPost(blogId);
    } else {
        blogElements.blogContent.innerHTML = '<p>Post ID is missing.</p>';
    }

    const hamburgerElements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        closeHamburger: document.querySelector('.close-hamburger')
    };

    setupHamburgerMenu(hamburgerElements);
})();
