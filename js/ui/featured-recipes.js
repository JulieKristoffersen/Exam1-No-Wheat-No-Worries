import { fetchData } from '../api/fetch-posts.js';

export const loadFeaturedRecipes = async (elements) => {
    const recipes = await fetchData('https://julnys.no/wp-json/wp/v2/posts?_embed=true') || [];
    const featuredRecipes = recipes.slice(5, 8); 

    elements.recipeCardsContainer.innerHTML = ''; 

    for (const recipe of featuredRecipes) {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        const imgSrc = recipe._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'default-image.jpg';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = recipe.title.rendered;

        const title = document.createElement('h3');
        title.textContent = recipe.title.rendered;

        const link = document.createElement('a');
        link.href = `blog-post.html?id=${recipe.id}`;
        link.textContent = 'View Recipe';

        card.append(img, title, link);
        elements.recipeCardsContainer.appendChild(card);
    }
};
