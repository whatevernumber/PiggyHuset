export async function load({ fetch }) {

    const res = await fetch('/api/articles/news/all');
    const data = await res.json();

    return {
        news: data,
    };
}