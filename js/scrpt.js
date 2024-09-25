const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.carousel-button-right');
const prevButton = document.querySelector('.carousel-button-left');
let currentSlide = 0;
let slideWidth;

// Fetch posts from the WordPress REST API
async function fetchPosts() {
    const response = await fetch('https://your-wordpress-site.com/wp-json/wp/v2/posts');
    const posts = await response.json();
    return posts;
}

// Function to create a slide for each post
function createSlide(post) {
    const slide = document.createElement('li');
    slide.classList.add('carousel-slide');
    slide.style.minWidth = '25%'; // Show 4 posts at a time

    const img = document.createElement('img');
    img.src = post.featured_media_src_url || 'default-image.jpg'; // Replace with the actual image field if available
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
    if (currentSlide < slides.length - 4) { // Shows 4 posts at a time
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

function add_featured_image_to_rest_api() {
    register_rest_field( 
        'post', 
        'featured_media_src_url', 
        array(
            'get_callback'    => function( $object ) {
                $featured_image_id = $object['featured_media']; // Get the featured image id
                $featured_image_url = wp_get_attachment_image_src( $featured_image_id, 'full' ); // Get the image src
                return $featured_image_url ? $featured_image_url[0] : ''; // Return the url
            },
            'schema'          => null,
        )
    );
}
add_action( 'rest_api_init', 'add_featured_image_to_rest_api' );
