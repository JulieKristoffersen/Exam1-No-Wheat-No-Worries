export async function fetchFeaturedImage(imageId) {
    const baseUrl = 'https://julnys.no/wp-json/wp/v2';
    if (!imageId) return 'default-image.jpg'; // Return default image if no ID
    const response = await fetch(`${baseUrl}/media/${imageId}`);
    if (!response.ok) {
        console.error('Failed to fetch image', response.status);
        return 'default-image.jpg'; // Return default image on error
    }
    const imageData = await response.json();
    return imageData.source_url;
}

export async function renderBlogPost(post, container) {
    const blogPost = document.createElement('div');
    blogPost.classList.add('blog-post');

    const imgSrc = await fetchFeaturedImage(post.featured_media);

    blogPost.innerHTML = `
        <img src="${imgSrc}" alt="${post.title.rendered}" style="width:100%; height:auto; object-fit:cover;">
        <h2>${post.title.rendered}</h2>
        <p>${post.excerpt.rendered}</p>
        <a href="blog-post.html?id=${post.id}" target="_self">Read More</a>
    `;

    container.appendChild(blogPost);
}
