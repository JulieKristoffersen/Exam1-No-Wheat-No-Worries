import { setupHamburgerMenu } from './ui/hamburger-menu.js';

document.addEventListener('DOMContentLoaded', async () => {
    const blogContent = document.getElementById('blog-content');
    const blogTitle = document.getElementById('blog-title');
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async function fetchBlogById(id) {
        const url = `https://julnys.no/wp-json/wp/v2/posts/${id}?_embed=true`; 
        return await fetchData(url);
    }

    const blogPost = await fetchBlogById(blogId);

    if (blogPost) {
        blogTitle.innerText = `My Blog | ${blogPost.title.rendered}`;

        const featuredImage = blogPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'default-image.jpg';

        blogContent.innerHTML = `
            <h1>${blogPost.title.rendered}</h1>
            <img src="${featuredImage}" alt="${blogPost.title.rendered}" class="post-image" />
            <div>${blogPost.content.rendered}</div>
        `;
        
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modal-image');
        const caption = document.getElementById('caption');
        const closeModal = document.querySelector('.close-modal');
        
        const postImage = document.querySelector('.post-image');
        postImage.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImage.src = postImage.src;
            caption.innerHTML = postImage.alt;
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
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
