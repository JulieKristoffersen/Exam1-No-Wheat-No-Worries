document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const closeHamburger = document.querySelector('.close-hamburger');

    hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.contains('active');
        if (isActive) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '&#9776;';
        } else {
            navLinks.classList.add('active');
            hamburger.innerHTML = '&times;';
        }
        hamburger.classList.toggle('is-active');
    });

    closeHamburger.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '&#9776;';
        hamburger.classList.remove('is-active');
    });

    document.querySelectorAll('.nav-links a').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '&#9776;';
            hamburger.classList.remove('is-active');
        });
    });

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.carousel-button-right');
    const prevButton = document.querySelector('.carousel-button-left');
    let currentSlide = 0;
    let slideWidth;

    async function fetchPosts() {
        const response = await fetch('https://julnys.no/wp-json/wp/v2/posts');
        const posts = await response.json();
        return posts;
    }

    async function fetchFeaturedImage(imageId) {
        if (!imageId) return 'default-image.jpg';
        const response = await fetch(`https://julnys.no/wp-json/wp/v2/media/${imageId}`);
        const image = await response.json();
        return image.source_url;
    }

    async function createSlide(post) {
        const slide = document.createElement('li');
        slide.classList.add('carousel-slide');

        const imgSrc = await fetchFeaturedImage(post.featured_media);
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

    async function loadPosts() {
        const posts = await fetchPosts();
        track.innerHTML = '';

        for (const post of posts) {
            const slide = await createSlide(post);
            track.appendChild(slide);
        }

        const slides = Array.from(track.children);
        slideWidth = slides[0].getBoundingClientRect().width;

        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
    }

    nextButton.addEventListener('click', () => {
        const slides = Array.from(track.children);
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            track.style.transform = 'translateX(-' + (slideWidth * currentSlide) + 'px)';
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            track.style.transform = 'translateX(-' + (slideWidth * currentSlide) + 'px)';
        }
    });

    loadPosts();
});
