export const renderBlogPost = (post, container) => {
    // Access the featured image directly from the embedded data
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'default-image.jpg';

    // Create a div element for the blog post
    const blogPost = document.createElement('div');
    blogPost.classList.add('blog-post');

    // Set the inner HTML of the blog post div with the post content and the featured image
    blogPost.innerHTML = `
        <img src="${featuredImage}" alt="${post.title.rendered}" style="width:100%; height:auto; object-fit:cover;" class="post-image">
        <h2>${post.title.rendered}</h2>
        <p>${post.excerpt.rendered}</p>
        <a href="blog-post.html?id=${post.id}" target="_self">Read More</a>
    `;

    // Append the blog post div to the container
    container.appendChild(blogPost);
};
