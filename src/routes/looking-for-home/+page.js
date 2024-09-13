export async function load({ fetch }) {

    let res = await fetch('/api/pigs/all');
    const data = await res.json();

    res = await fetch('/api/pigs/count?status_id=1');
    const available_pigs_count = await res.json();

    return {
        pigs: data,
        count: available_pigs_count,
    };
}