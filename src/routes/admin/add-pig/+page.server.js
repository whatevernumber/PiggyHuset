import {goto} from "$app/navigation";

export const ssr = false;

export function load({cookies}) {
    if (!cookies.get('bearer')) {
        goto('/');
    }
}