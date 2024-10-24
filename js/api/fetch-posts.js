export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; 
    }
};

export const fetchBlogById = async (id) => {
    const url = `https://julnys.no/wp-json/wp/v2/posts/${id}?_embed=true`;
    return await fetchData(url);
};

