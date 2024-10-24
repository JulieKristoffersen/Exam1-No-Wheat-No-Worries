import { setupHamburgerMenu } from './ui/hamburger-menu.js';
import { fetchBlogById } from './api/fetch-posts.js';
import { setupModal } from './ui/modal.js';

document.addEventListener('DOMContentLoaded', async () => {
    const blogContent = document.getElementById('blog-content');
    const blogTitle = document.getElementById('blog-title');
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');

    const blogPost = await fetchBlogById(blogId);

    if (blogPost) {
        blogTitle.innerText = `My Blog | ${blogPost.title.rendered}`;

        const featuredImage = blogPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'default-image.jpg';

        blogContent.innerHTML = `
            <h1>${blogPost.title.rendered}</h1>
            <img src="${featuredImage}" alt="${blogPost.title.rendered}" class="post-image" />
            <div>${blogPost.content.rendered}</div>
        `;
        
        const modalElements = {
            modal: document.getElementById('modal'),
            modalImage: document.getElementById('modal-image'),
            caption: document.getElementById('caption'),
            closeModal: document.querySelector('.close-modal'),
        };
        
        const postImage = document.querySelector('.post-image');
        setupModal(postImage, modalElements);
    } else {
        blogContent.innerHTML = '<p>Post not found.</p>';
    }

    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        closeHamburger: document.querySelector('.close-hamburger'),
    };

    setupHamburgerMenu(elements); 
});
