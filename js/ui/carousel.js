import { fetchData } from '../api/fetch-posts.js';

let currentSlide = 0;
let slideWidth;
let visibleSlidesCount = 1;

export const loadCarouselPosts = async (elements) => {
    if (!elements.track || !elements.nextButton || !elements.prevButton) return;

    // Fetch only the 10 latest posts
    const posts = await fetchData('https://julnys.no/wp-json/wp/v2/posts?_embed&per_page=10');
    if (!posts) return;

    elements.track.innerHTML = '';
    for (const post of posts) {
        const slide = await createSlide(post);
        elements.track.appendChild(slide);
    }

    updateSlideWidth(elements.track);
    calculateVisibleSlides(elements);
    updateButtonVisibility(elements, posts.length);
    positionSlides(elements.track);
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
    img.style.cssText = 'width:100%; height:200px; object-fit:cover;';

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
        if (currentSlide < slides.length - visibleSlidesCount) {
            moveToSlide(elements, currentSlide + 1);
        }
    });

    elements.prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            moveToSlide(elements, currentSlide - 1);
        }
    });

    window.addEventListener('resize', () => {
        updateSlideWidth(elements.track);
        calculateVisibleSlides(elements);
        positionSlides(elements.track);
        updateButtonVisibility(elements, elements.track.children.length);
    });
};

const updateSlideWidth = (track) => {
    const slides = Array.from(track.children);
    slideWidth = slides[0]?.getBoundingClientRect().width || 0;
};

const calculateVisibleSlides = (elements) => {
    const trackWidth = elements.track.getBoundingClientRect().width;
    visibleSlidesCount = Math.floor(trackWidth / slideWidth);
};

const positionSlides = (track) => {
    const slides = Array.from(track.children);
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });
};

const moveToSlide = (elements, targetSlide) => {
    currentSlide = targetSlide;
    elements.track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    updateButtonVisibility(elements, elements.track.children.length);
};

const updateButtonVisibility = (elements, totalSlides) => {
    elements.prevButton.style.display = currentSlide === 0 ? 'none' : 'block';
    elements.nextButton.style.display = currentSlide >= totalSlides - visibleSlidesCount ? 'none' : 'block';
};
