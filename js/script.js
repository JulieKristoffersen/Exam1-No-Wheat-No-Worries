document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const closeHamburger = document.querySelector('.close-hamburger');
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.carousel-button-right');
    const prevButton = document.querySelector('.carousel-button-left');
    const recipeCardsContainer = document.querySelector('.recipe-cards'); 
    let currentSlide = 0;
    let slideWidth;

    if (hamburger && navLinks) {
        function toggleMenu(isOpen) {
            if (isOpen) {
                navLinks.classList.add('active');
                hamburger.innerHTML = '&times;';
            } else {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '&#9776;';
            }
            hamburger.classList.toggle('is-active', isOpen);
        }

        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            toggleMenu(!isActive);
        });

        if (closeHamburger) {
            closeHamburger.addEventListener('click', () => {
                toggleMenu(false);
            });
        }

        document.querySelectorAll('.nav-links a').forEach(item => {
            item.addEventListener('click', () => {
                toggleMenu(false);
            });
        });
    }

    async function fetchData(url) {
        const response = await fetch(url);
        return response.json();
    }

    async function fetchFeaturedImage(imageId) {
        if (!imageId) return 'default-image.jpg';
        const image = await fetchData(`https://julnys.no/wp-json/wp/v2/media/${imageId}`);
        return image.source_url;
    }

    if (track && nextButton && prevButton) {
        async function fetchPosts() {
            return await fetchData('https://julnys.no/wp-json/wp/v2/posts');
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

        function moveToSlide(slides, targetSlide) {
            currentSlide = targetSlide;
            track.style.transform = 'translateX(-' + (slideWidth * currentSlide) + 'px)';
        }

        nextButton.addEventListener('click', () => {
            const slides = Array.from(track.children);
            if (currentSlide < slides.length - 1) {
                moveToSlide(slides, currentSlide + 1);
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                moveToSlide(track.children, currentSlide - 1);
            }
        });

        loadPosts();
    }

    async function fetchFeaturedRecipes() {
        const response = await fetch('https://julnys.no/wp-json/wp/v2/posts'); 
        const recipes = await response.json();
        return recipes.slice(0, 3); 
    }

    async function loadFeaturedRecipes() {
        const recipes = await fetchFeaturedRecipes();
        recipeCardsContainer.innerHTML = ''; 

        for (const recipe of recipes) {
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

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(link);
            recipeCardsContainer.appendChild(card);
        }
    }

    loadFeaturedRecipes();
});
