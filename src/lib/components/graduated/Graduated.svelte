<script>
    import BigHeader from '$lib/components/misc/h-headers/BigHeader.svelte';
    import GraduatedCard from '$lib/components/cards/graduate-card/GraduatedCard.svelte';
    import Button from '$lib/components/misc/button/Button.svelte';
    import {_REMOTE_SERVER} from "$env/static/public";
    import {randomElements} from "$lib/components/utils/func.js";

    let graduates = [];

    const request = fetch(_REMOTE_SERVER + '/pigs/graduated')
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        });

    async function initFetch () {
        request.then(json => graduates = randomElements(json.payload, 3))
            .catch((any) => {})
    }
</script>

<section class="graduated">
    <BigHeader text_content="Наши выпускники" />
    {#await initFetch()}
    <div class="graduated_cards_wrapper">
        <GraduatedCard name='Финик' id="1" />
        <GraduatedCard name='Блиник' id="2" />
        <GraduatedCard name='Пиник' id="3" />
    </div>
        {:then _}
    <div class="graduated_cards_wrapper">
        {#each graduates as graduate}
        <GraduatedCard name='{graduate.name}'
                       img="{graduate.main_photo ? graduate.main_photo + '.jpg' : null}"
                       id="{graduate.id}" />
        {/each}
    </div>
    {/await}
    <Button href="/graduates" title="Посмотреть всех" background_color="#D97544" text_color="#FFFFFF" />
</section>


<style>
    .graduated {
        margin-bottom: 40px;
        padding: 0 80px;
    }

    .graduated_cards_wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }
</style>