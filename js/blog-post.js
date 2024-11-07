import { setupHamburgerMenu } from './ui/hamburger-menu.js';
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

    const postImage = document.querySelector('.post-image');
    if (postImage) {
        setupModal(postImage, blogElements);
    }
}


async function loadBlogPost(blogId) {
    const url = `https://julnys.no/wp-json/wp/v2/posts/${blogId}?_embed`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error('Failed to fetch blog post', response.status);
            alert(`Failed to fetch blog post. Server responded with status: ${response.status}`);
            return;
        }

        const blogPost = await response.json();
        renderPost(blogPost);
    } catch (error) {
        console.error('Network error:', error);
        alert(`Sorry, we are unable to fetch the blog post due to: ${error.message}`);
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
        alert('Post ID is missing.');
    }

    const hamburgerElements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links')
    };

    setupHamburgerMenu(hamburgerElements); 
})();
