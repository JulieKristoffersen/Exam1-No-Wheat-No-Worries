// js/api/fetch-posts.js

// Utility: Fetch Data
export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Utility: Fetch Featured Image
export const fetchFeaturedImage = async (imageId) => {
    if (!imageId) return 'default-image.jpg';
    const image = await fetchData(`https://julnys.no/wp-json/wp/v2/media/${imageId}`);
    return image?.source_url || 'default-image.jpg';
};
