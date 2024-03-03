import {_REMOTE_SERVER} from "$env/static/public";

export async function load({ fetch }) {

    const res = await fetch(`${_REMOTE_SERVER}/pigs?expand=city,status`);
    const data = res.json();

    return {
        pigs: data,
    };
}