import {goto} from "$app/navigation";
import {_ADMIN_FLAG} from "$env/static/public";

export const ssr = false;

export function load() {
    let admin = localStorage.getItem(_ADMIN_FLAG);

    if (!admin) {
        goto('/');
    }
}