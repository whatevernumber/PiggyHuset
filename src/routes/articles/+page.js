export async function load({ fetch }) {

    const res = await fetch('/api/articles/all');
    const data = await res.json();

    return {
        articles: data,
    };
}