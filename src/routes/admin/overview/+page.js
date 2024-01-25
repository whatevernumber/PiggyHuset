import {_REMOTE_SERVER} from "$env/static/public";

export async function load({ fetch }) {

    const pigs = await fetch(`${_REMOTE_SERVER}/pigs`);
    const news = await fetch(`${_REMOTE_SERVER}/articles/type/2`);
    const articles = await fetch(`${_REMOTE_SERVER}/articles/type/1`);
    const graduates = await fetch(`${_REMOTE_SERVER}/pigs/graduated`);

    return {
        pigs: await pigs.json(),
        news: await news.json(),
        articles: await articles.json(),
        graduates: await graduates.json()
    };
}