export async function load({ fetch }) {

    const res = await fetch('/api/pigs/all');
    const data = await res.json();

    return {
        pigs: data,
    };
}