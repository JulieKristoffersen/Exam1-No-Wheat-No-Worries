import { fetchData, postUrl } from '../constant/api';

export async function displayFeaturedRecipes(recipeCardsContainer) {
    const recipes = await fetchData(postUrl);
    recipeCardsContainer.innerHTML = '';

    recipes.slice(0, 3).forEach(recipe => {
        const card = createRecipeCard(recipe);
        recipeCardsContainer.appendChild(card);
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    const imgSrc = recipe._embedded['wp:featuredmedia'] && recipe._embedded['wp:featuredmedia'][0] 
        ? recipe._embedded['wp:featuredmedia'][0].source_url 
        : 'default-recipe-image-url.png'; 

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = recipe.title.rendered;

    const title = document.createElement('h3');
    title.textContent = recipe.title.rendered;

    const link = document.createElement('a');
    link.href = recipe.link;
    link.textContent = 'View Recipe';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(link);

    return card;
}
