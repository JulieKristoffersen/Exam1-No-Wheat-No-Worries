document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle navigation menu on hamburger click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('is-active');

        // Toggle between hamburger and 'X' icon
        if (hamburger.classList.contains('is-active')) {
            hamburger.innerHTML = '&times;'; // Close icon
        } else {
            hamburger.innerHTML = '&#9776;'; // Hamburger icon
        }
    });

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.carousel-button-right');
    const prevButton = document.querySelector('.carousel-button-left');
    let currentSlide = 0;
    let slideWidth;

    // Fetch posts from the WordPress REST API for carousel
    async function fetchPosts() {
        const response = await fetch('https://julnys.no/wp-json/wp/v2/posts');
        const posts = await response.json();
        return posts;
    }

    // Fetch the featured image URL for a given post
    async function fetchFeaturedImage(imageId) {
        if (!imageId) return 'default-image.jpg'; // Return a default image if no ID
        const response = await fetch(`https://julnys.no/wp-json/wp/v2/media/${imageId}`);
        const image = await response.json();
        return image.source_url; // Return the image URL
    }

    // Function to create a slide for each post
    async function createSlide(post) {
        const slide = document.createElement('li');
        slide.classList.add('carousel-slide');
        slide.style.minWidth = '25%'; // Show 4 posts at a time

        const imgSrc = await fetchFeaturedImage(post.featured_media);
        const img = document.createElement('img');
        img.src = imgSrc; // Use the fetched image URL
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

    // Load posts and populate the carousel
    async function loadPosts() {
        const posts = await fetchPosts();

        // Clear existing slides before appending new ones
        track.innerHTML = '';

        for (const post of posts) {
            const slide = await createSlide(post);
            track.appendChild(slide);
        }

        const slides = Array.from(track.children);
        slideWidth = slides[0].getBoundingClientRect().width;

        // Set the position of each slide
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
    }

    nextButton.addEventListener('click', () => {
        const slides = Array.from(track.children);
        if (currentSlide < slides.length - 4) { 
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

    // Recipe loading functionality
    const recipeContainer = document.querySelector('.recipe-cards');

    async function loadRecipes() {
        const recipes = await fetchPosts(); // Assuming recipes are also posts

        recipeContainer.innerHTML = ''; 

        for (const recipe of recipes) {
            const imgSrc = await fetchFeaturedImage(recipe.featured_media);
            const recipeCard = `
                <div class="recipe-card">
                    <img src="${imgSrc}" alt="${recipe.title.rendered}">
                    <h3>${recipe.title.rendered}</h3>
                    <p>${recipe.excerpt.rendered}</p>
                    <a href="${recipe.link}" class="recipe-button">Read More</a>
                </div>
            `;
            recipeContainer.innerHTML += recipeCard;
        }
    }

    loadRecipes();
});
