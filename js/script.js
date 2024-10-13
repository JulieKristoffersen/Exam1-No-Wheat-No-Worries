// js/script.js

import { fetchData, fetchFeaturedImage } from './fetch-posts';

document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        closeHamburger: document.querySelector('.close-hamburger'),
        track: document.querySelector('.carousel-track'),
        nextButton: document.querySelector('.carousel-button-right'),
        prevButton: document.querySelector('.carousel-button-left'),
        recipeCardsContainer: document.querySelector('.recipe-cards'),
    };

    let currentSlide = 0;
    let slideWidth;

    // Utility: Toggle Hamburger Menu
    const toggleMenu = (isOpen) => {
        elements.navLinks.classList.toggle('active', isOpen);
        elements.hamburger.innerHTML = isOpen ? '&times;' : '&#9776;';
        elements.hamburger.classList.toggle('is-active', isOpen);
    };

    // Event: Hamburger Menu Click
    const setupHamburgerMenu = () => {
        if (!elements.hamburger || !elements.navLinks) return;
        
        elements.hamburger.addEventListener('click', () => {
            const isActive = elements.navLinks.classList.contains('active');
            toggleMenu(!isActive);
        });

        elements.closeHamburger?.addEventListener('click', () => toggleMenu(false));

        document.querySelectorAll('.nav-links a').forEach(item => {
            item.addEventListener('click', () => toggleMenu(false));
        });
    };

    // Utility: Create Slide
    const createSlide = async (post) => {
        const slide = document.createElement('li');
        slide.classList.add('carousel-slide');

        const imgSrc = await fetchFeaturedImage(post.featured_media);
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = post.title.rendered;
        img.style.cssText = 'width:100%; height:150px; object-fit:cover;';

        const h3 = document.createElement('h3');
        h3.textContent = post.title.rendered;

        const link = document.createElement('a');
        link.href = post.link;
        link.textContent = 'Read More';

        slide.append(img, h3, link);
        return slide;
    };

    // Carousel: Load Posts into Carousel
    const loadCarouselPosts = async () => {
        if (!elements.track || !elements.nextButton || !elements.prevButton) return;

        const posts = await fetchData('https://julnys.no/wp-json/wp/v2/posts?_embed');
        if (!posts) return;
        
        elements.track.innerHTML = '';
        for (const post of posts) {
            const slide = await createSlide(post);
            elements.track.appendChild(slide);
        }

        const slides = Array.from(elements.track.children);
        slideWidth = slides[0]?.getBoundingClientRect().width || 0;

        slides.forEach((slide, index) => {
            slide.style.left = `${slideWidth * index}px`;
        });
    };

    // Carousel: Move to Slide
    const moveToSlide = (targetSlide) => {
        currentSlide = targetSlide;
        elements.track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    };

    // Event: Set Up Carousel Navigation
    const setupCarouselNavigation = () => {
        elements.nextButton.addEventListener('click', () => {
            const slides = Array.from(elements.track.children);
            if (currentSlide < slides.length - 1) moveToSlide(currentSlide + 1);
        });

        elements.prevButton.addEventListener('click', () => {
            if (currentSlide > 0) moveToSlide(currentSlide - 1);
        });
    };

    // Recipes: Load Featured Recipes
    const loadFeaturedRecipes = async () => {
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

    // Initialize the page
    setupHamburgerMenu();
    loadCarouselPosts();
    setupCarouselNavigation();
    loadFeaturedRecipes();
});
