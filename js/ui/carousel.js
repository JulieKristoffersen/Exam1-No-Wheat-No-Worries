import { fetchData } from '../api/fetch-posts.js';

let currentSlide = 0;
let slideWidth;
const slidesPerPage = 3;

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

const createSlide = async (post) => {
    const slide = document.createElement('li');
    slide.classList.add('carousel-slide');

    const imgSrc = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'default-image.jpg';

    const link = document.createElement('a');
    link.href = `blog-post.html?id=${post.id}`;  
    link.style.textDecoration = 'none'; 

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = post.title.rendered;
    img.style.cssText = 'width:100%; height:150px; object-fit:cover;';

    const h3 = document.createElement('h3');
    h3.textContent = post.title.rendered;

    link.appendChild(img);
    link.appendChild(h3);

    slide.appendChild(link);
    return slide;
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
