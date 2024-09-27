document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.carousel-button-right');
    const prevButton = document.querySelector('.carousel-button-left');
    let currentSlide = 0;
    let slideWidth;

    // Fetch posts from the WordPress REST API for carousel
    async function fetchPosts() {
        const response = await fetch('https://julnys.no');
        const posts = await response.json();
        return posts;
    }

    // Function to create a slide for each post
    function createSlide(post) {
        const slide = document.createElement('li');
        slide.classList.add('carousel-slide');
        slide.style.minWidth = '25%'; // Show 4 posts at a time

        const img = document.createElement('img');
        img.src = post.featured_media_src_url || 'default-image.jpg'; // Use featured image or default
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
        
        posts.forEach(post => {
            const slide = createSlide(post);
            track.appendChild(slide);
        });

        // Set slide width for dynamic post loading
        const slides = Array.from(track.children);
        slideWidth = slides[0].getBoundingClientRect().width;

        // Arrange the slides next to one another
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
    }

    // Move to the next slide
    nextButton.addEventListener('click', () => {
        const slides = Array.from(track.children);
        if (currentSlide < slides.length - 4) { // Show 4 posts at a time
            currentSlide++;
            track.style.transform = 'translateX(-' + (slideWidth * currentSlide) + 'px)';
        }
    });

    // Move to the previous slide
    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            track.style.transform = 'translateX(-' + (slideWidth * currentSlide) + 'px)';
        }
    });

    // Load the posts and initialize the carousel
    loadPosts();

    // Fetch and display recipes dynamically from WordPress
    const recipeContainer = document.querySelector('.recipe-cards');

    async function fetchRecipes() {
        const response = await fetch('https://your-wordpress-site.com/wp-json/wp/v2/recipes');
        const recipes = await response.json();
        return recipes;
    }

    async function loadRecipes() {
        const recipes = await fetchRecipes();

        recipeContainer.innerHTML = ''; // Clear existing recipes

        recipes.forEach(recipe => {
            const recipeCard = `
                <div class="recipe-card">
                    <img src="${recipe.featured_media_src_url}" alt="${recipe.title.rendered}">
                    <h3>${recipe.title.rendered}</h3>
                    <p>${recipe.excerpt.rendered}</p>
                    <a href="${recipe.link}" class="recipe-button">Read More</a>
                </div>
            `;
            recipeContainer.innerHTML += recipeCard;
        });
    }

    // Load the recipes from the WordPress API
    loadRecipes();
});
