import {_REMOTE_SERVER} from "$env/static/public";

export async function load({ fetch }) {

    const res = await fetch(`${_REMOTE_SERVER}/pigs/graduated?expand=city,status`);
    const data = await res.json();

    return {
        graduates: data,
    };
}