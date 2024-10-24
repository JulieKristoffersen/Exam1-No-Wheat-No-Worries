import { fetchData } from './fetch-posts.js';

export async function fetchBlogs(page = 1, limit = 10, category = '') {
    const baseUrl = 'https://julnys.no/wp-json/wp/v2';
    let url = `${baseUrl}/posts?page=${page}&per_page=${limit}&_embed`;

    if (category) {
        url += `&categories=${category}`;
    }
    return await fetchData(url);
}

export async function fetchCategories() {
    const baseUrl = 'https://julnys.no/wp-json/wp/v2';
    const url = `${baseUrl}/categories`;

    return await fetchData(url);
}
