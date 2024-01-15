import {_REMOTE_SERVER} from "$env/static/public";

export async function load({ fetch }) {

    const res = await fetch(`${_REMOTE_SERVER}/articles/type/1`);
    const data = res.json();

    return {
        articles: data,
    };
}