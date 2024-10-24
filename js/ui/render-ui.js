export const renderBlogPost = (post, container) => {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'default-image.jpg';

    const blogPost = document.createElement('div');
    blogPost.classList.add('blog-post');

    blogPost.innerHTML = `
        <img src="${featuredImage}" alt="${post.title.rendered}" class="post-image" style="width:100%; height:auto;">
        <h2>${post.title.rendered}</h2>
        <p>${post.excerpt.rendered}</p>
        <a href="blog-post.html?id=${post.id}" target="_self">Read More</a>
    `;

    container.appendChild(blogPost);
};

export const renderCategories = (categories, container, resetBlogPosts) => {
    container.innerHTML = '';

    const allCategoriesItem = document.createElement('li');
    allCategoriesItem.textContent = 'All Categories';
    allCategoriesItem.addEventListener('click', () => {
        resetBlogPosts();
    });
    container.appendChild(allCategoriesItem);

    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.textContent = category.name;
        categoryItem.addEventListener('click', () => {
            resetBlogPosts(category.id);
        });
        container.appendChild(categoryItem);
    });
};
