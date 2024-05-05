import {_REMOTE_SERVER} from "$env/static/public";

export async function load({ fetch }) {

    const res = await fetch(`${_REMOTE_SERVER}/articles/type/2`);
    const data = await res.json();

    return {
        news: data,
    };
}