import { initMenu } from '../js/menu/nav.js';
import { displayCarouselPosts } from './widgets/carousel.js';
import { displayFeaturedRecipes } from './widgets/featured.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const closeHamburger = document.querySelector('.close-hamburger');
        initMenu(hamburger, navLinks, closeHamburger);

        const track = document.querySelector('.carousel-track');
        const nextButton = document.querySelector('.carousel-button-right');
        const prevButton = document.querySelector('.carousel-button-left');
        const recipeCardsContainer = document.querySelector('.recipe-cards');
        await displayCarouselPosts(track, nextButton, prevButton);
        await displayFeaturedRecipes(recipeCardsContainer);

    } catch (error) {
        console.error(error);
    }
});
