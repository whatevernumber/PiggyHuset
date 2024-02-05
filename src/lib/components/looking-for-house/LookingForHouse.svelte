<script>
    import Button from '$lib/components/misc/button/Button.svelte';
    import BigHeader from '$lib/components/misc/h-headers/BigHeader.svelte';
    import '@splidejs/svelte-splide/css/splide.min.css';
    import PhotoList from "$lib/components/photo-list/PhotoList.svelte";
    import {_REMOTE_SERVER} from "$env/static/public";

    let pigs = [];
    let photos = [];
    let showPhotos = false;

    const request = fetch(_REMOTE_SERVER + '/pigs/random/10')
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        });

    async function initFetch () {
        request.then(json => pigs = json.payload)
            .then(
                () => pigs.map((pig) => {
                        if (pig.main_photo) {
                            photos.push({
                                'id': pig.id,
                                'image': pig.main_photo,
                            })
                        }
                    }
                )
            )
            .then(() => showPhotos = true)
            .catch((any) => {})
    }
</script>

<section class="looking_for_home">
    <BigHeader text_content="Ищут дом" />

    {#await initFetch()}
    <PhotoList photos="{Array(4).fill({image: '200w.jpg'})}" autoplay="{true}" no_border />
    {:then _}
        {#if showPhotos}
    <PhotoList first_slide="src/lib/img/looking-for-home.png" {photos} autoplay="{true}" no_border linked />
        {:else}
    <PhotoList photos="{Array(4).fill({image: '200w.jpg'})}" autoplay="{true}" no_border />
        {/if}
    {/await}

    <Button href="/looking-for-home" title="Ищут дом" background_color="#D97544" text_color="#FFFFFF" />
</section>

<style>
    .looking_for_home {
        margin: 40px auto;
        padding: 0 80px;
    }

    @media (max-width: 1001px) {
        .looking_for_home {
            padding: 0;
            max-width: 100%;
        }
    }
</style>