import { fetchData, postUrl } from '../constant/api.js';

export async function displayCarouselPosts(track, nextButton, prevButton) {
    if (!track || !nextButton || !prevButton) return;

    const posts = await fetchData(postUrl);
    track.innerHTML = '';

    posts.forEach((post, index) => {
        const slide = createSlide(post);
        slide.style.left = `${slide.getBoundingClientRect().width * index}px`;
        track.appendChild(slide);
    });

    let currentSlide = 0;
    const slides = Array.from(track.children);
    const slideWidth = slides[0]?.getBoundingClientRect().width || 0;

    nextButton.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
        }
    });
}

function createSlide(post) {
    const slide = document.createElement('li');
    slide.classList.add('carousel-slide');

    const imgSrc = post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] 
        ? post._embedded['wp:featuredmedia'][0].source_url 
        : 'default-image-url.png'; 

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = post.title.rendered;
    img.style.width = '100%';
    img.style.height = '150px';
    img.style.objectFit = 'cover';

    const h3 = document.createElement('h3');
    h3.textContent = post.title.rendered;

    const link = document.createElement('a');
    link.href = post.link;
    link.textContent = 'Read More';

    slide.appendChild(img);
    slide.appendChild(h3);
    slide.appendChild(link);

    return slide;
}
