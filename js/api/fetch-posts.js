export const fetchData = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error('Failed to fetch data:', response.status);
            alert(`Failed to fetch data. Server responded with status: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(`Sorry, we are unable to fetch data due to: ${error.message}`);
        return null;
    }
};

export const fetchBlogById = async (id) => {
    const url = `https://julnys.no/wp-json/wp/v2/posts/${id}?_embed=true`;
    return await fetchData(url);
};
