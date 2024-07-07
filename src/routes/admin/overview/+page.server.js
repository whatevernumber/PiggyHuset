import { redirect } from '@sveltejs/kit';

export async function load({ fetch, cookies }) {

    if (!cookies.get('bearer')) {
        throw redirect(308, '/');
    }

    const pigs = await fetch('/api/pigs/all');
    const news = await fetch('/api/articles/news/all');
    const articles = await fetch('/api/articles/all');
    const graduates = await fetch('/api/pigs/all?graduated=true');

    return {
        authorized: cookies.get('bearer') ? true : false,
        pigs: await pigs.json(),
        news: await news.json(),
        articles: await articles.json(),
        graduates: await graduates.json()
    };
}