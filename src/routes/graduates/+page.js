import {_REMOTE_SERVER} from "$env/static/public";

export async function load({ fetch }) {

    const res = await fetch(`${_REMOTE_SERVER}/pigs/graduated?expand=city`);
    const data = res.json();

    return {
        graduates: data,
    };
}