<script>
    import BigHeader from '$lib/components/misc/h-headers/BigHeader.svelte';
    import GraduatedCard from '$lib/components/cards/graduate-card/GraduatedCard.svelte';
    import Button from '$lib/components/misc/button/Button.svelte';
    import {_REMOTE_SERVER} from "$env/static/public";
    import {randomElements} from "$lib/components/utils/func.js";

    let graduates = [];
    let show_number = 3; // необходимое количество свинок для получения;

    const request = fetch(_REMOTE_SERVER + '/pigs/random/' + show_number + '/graduated')
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        });

    const initFetch = async function () {
        request.then(json => graduates = randomElements(json.payload, 3))
            .catch((any) => {})
    }
</script>

<section class="graduated">
    <BigHeader text_content="Наши выпускники" />
    {#await initFetch()}
    <div class="graduated_cards_wrapper">
        <GraduatedCard name='Финик'  id="1" />
        <GraduatedCard name='Свиник' id="2" />
        <GraduatedCard name='Блиник' id="3" />
    </div>
        {:then}
    <div class="graduated_cards_wrapper">
        {#each graduates as graduate}
        <GraduatedCard name='{graduate.name}'
                       img="{graduate.main_photo ? graduate.main_photo : null}"
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

    @media (max-width: 1001px) {

        .graduated {
            max-width: 400px;
            padding: 0;
            margin-left: auto;
            margin-right: auto;
        }

        .graduated_cards_wrapper {
            flex-wrap: wrap;
            justify-content: center;
        }
    }
</style>