export async function load({ fetch, url }) {

    const tag = url.searchParams.get('tag') ?? null;
    let res;

    console.log(tag);

    if (tag) {
        res = await fetch('/api/articles/tag?tag=' + tag);
    } else {
        res = await fetch('/api/articles/news/all');
    }
    const data = await res.json();

    return {
        news: data,
        tag: tag,
    };
}