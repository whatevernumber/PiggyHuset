export async function load({ fetch, url }) {

    const tag = url.searchParams.get('tag') ?? null;
    let res;

    if (tag) {
        res = await fetch('/api/articles/tag?tag=' + tag);
    } else {
        res = await fetch('/api/articles/all');
    }

    const data = await res.json();

    return {
        articles: data,
        tag: tag,
    };
}