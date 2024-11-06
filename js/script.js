import { fetchData } from './api/fetch-posts.js';
import { setupHamburgerMenu } from './ui/hamburger-menu.js';
import { loadCarouselPosts, setupCarouselNavigation } from './ui/carousel.js';
import { loadFeaturedRecipes } from './ui/featured-recipes.js'; 
import './ui/newsletter.js';
import { showLoadingIndicator, hideLoadingIndicator } from './ui/loading-indicator.js';

showLoadingIndicator();

window.addEventListener("load", hideLoadingIndicator);

const elements = {
    hamburger: document.querySelector('.hamburger'),
    navLinks: document.querySelector('.nav-links'),
    closeHamburger: document.querySelector('.close-hamburger'),
    track: document.querySelector('.carousel-track'),
    nextButton: document.querySelector('.carousel-button-right'),
    prevButton: document.querySelector('.carousel-button-left'),
    recipeCardsContainer: document.querySelector('.recipe-cards'),
};

setupHamburgerMenu(elements);
loadCarouselPosts(elements);
setupCarouselNavigation(elements);
loadFeaturedRecipes(elements);
