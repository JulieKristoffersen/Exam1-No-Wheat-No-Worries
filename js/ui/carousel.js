// js/ui/carousel.js
import { fetchData, createSlide } from '../api/fetch-posts.js';

let currentSlide = 0;
let slideWidth;

export const loadCarouselPosts = async (elements) => {
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

export const setupCarouselNavigation = (elements) => {
    elements.nextButton.addEventListener('click', () => {
        const slides = Array.from(elements.track.children);
        if (currentSlide < slides.length - 1) moveToSlide(currentSlide + 1);
    });

    elements.prevButton.addEventListener('click', () => {
        if (currentSlide > 0) moveToSlide(currentSlide - 1);
    });
};

const moveToSlide = (targetSlide) => {
    currentSlide = targetSlide;
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
};
