// js/ui/featured-recipes.js
import { fetchData, fetchFeaturedImage } from '../api/fetch-posts.js';

export const loadFeaturedRecipes = async (elements) => {
    const recipes = await fetchData('https://julnys.no/wp-json/wp/v2/posts') || [];
    const featuredRecipes = recipes.slice(0, 3); // Fetch top 3 recipes

    elements.recipeCardsContainer.innerHTML = ''; // Clear existing content
    for (const recipe of featuredRecipes) {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        const imgSrc = await fetchFeaturedImage(recipe.featured_media);
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = recipe.title.rendered;

        const title = document.createElement('h3');
        title.textContent = recipe.title.rendered;

        const link = document.createElement('a');
        link.href = recipe.link;
        link.textContent = 'View Recipe';

        card.append(img, title, link);
        elements.recipeCardsContainer.appendChild(card);
    }
};
