export async function load({ fetch }) {

    const res = await fetch('/api/pigs/all?graduated=true');
    const data = await res.json();

    return {
        graduates: data,
    };
}