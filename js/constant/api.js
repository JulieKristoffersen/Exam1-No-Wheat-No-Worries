export const baseUrl = 'https://julnys.no';
export const postUrl = `${baseUrl}/wp-json/wp/v2/posts?_embed`;

export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data');
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
