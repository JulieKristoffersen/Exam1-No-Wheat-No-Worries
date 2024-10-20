export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const fetchFeaturedImage = async (imageId) => {
    if (!imageId) return 'default-image.jpg';
    const image = await fetchData(`https://julnys.no/wp-json/wp/v2/media/${imageId}`);
    return image?.source_url || 'default-image.jpg';
};

export const createSlide = async (post) => {
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
