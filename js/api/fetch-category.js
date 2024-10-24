export async function fetchBlogs(page = 1, limit = 10, category = '') {
    const baseUrl = 'https://julnys.no/wp-json/wp/v2';
    let url = `${baseUrl}/posts?page=${page}&per_page=${limit}&_embed`;

    if (category) {
        url += `&categories=${category}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        console.error('Failed to fetch posts', response.status);
        return [];
    }

    return await response.json();
}

export async function fetchCategories() {
    const baseUrl = 'https://julnys.no/wp-json/wp/v2';
    const url = `${baseUrl}/categories`;

    const response = await fetch(url);
    if (!response.ok) {
        console.error('Failed to fetch categories', response.status);
        return [];
    }

    return await response.json();
}
