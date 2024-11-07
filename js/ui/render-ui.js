export const renderBlogPost = (post, container) => {
    try {
        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'default-image.jpg';

        if (!post || !container) {
            throw new Error("Missing post data or container element.");
        }

        const blogPost = document.createElement('div');
        blogPost.classList.add('blog-post');

        const link = document.createElement('a');
        link.href = `blog-post.html?id=${post.id}`; 
        link.target = "_self"; 

        blogPost.innerHTML = `
            <h2>${post.title.rendered}</h2>
            <p>${post.excerpt.rendered}</p>
        `;
        
        const img = document.createElement('img');
        img.src = featuredImage;
        img.alt = post.title.rendered;
        img.classList.add('post-image'); 
        img.style.cssText = 'width:100%; height:auto;';

        link.appendChild(img);
        blogPost.prepend(link); 

        container.appendChild(blogPost);
    } catch (error) {
        console.error("Error rendering blog post:", error);
        alert("Sorry, an error occurred while rendering the blog post. Please try again.");
    }
};
