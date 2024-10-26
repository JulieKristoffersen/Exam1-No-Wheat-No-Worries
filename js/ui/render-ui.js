export const renderBlogPost = (post, container) => {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'default-image.jpg';

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
};
