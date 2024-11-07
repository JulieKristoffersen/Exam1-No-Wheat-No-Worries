export async function fetchBlogs(page = 1, limit = 10, category = '') {
    const baseUrl = 'https://julnys.no/wp-json/wp/v2';
    let url = `${baseUrl}/posts?page=${page}&per_page=${limit}&_embed`;

    if (category) {
        url += `&categories=${category}`;
    }

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            console.error('Failed to fetch posts', response.status);
            alert(`Failed to fetch more blog posts. Server responded with status: ${response.status}`);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Network error:', error);
        alert(`Sorry, we are unable to fetch the blogs due to: ${error.message}`);
        return [];
    }
}




export async function fetchCategories() {
    const baseUrl = 'https://julnys.no/wp-json/wp/v2';
    const url = `${baseUrl}/categories`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error('Failed to fetch categories', response.status);
            alert(`Failed to fetch categories. Server responded with status: ${response.status}`);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Network error:', error);
        alert(`Sorry, we are unable to fetch the categories due to: ${error.message}`);
        return [];
    }
}
