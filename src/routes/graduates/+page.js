export async function load({ fetch }) {

    let res = await fetch('/api/pigs/all?graduated=true');
    const data = await res.json();

    res = await fetch('/api/pigs/count?status_id=2');
    const graduated_count = await res.json();

    return {
        graduates: data,
        count: graduated_count,
    };
}