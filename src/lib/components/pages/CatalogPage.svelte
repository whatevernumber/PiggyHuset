<script>
    import BigHeader from "$lib/components/misc/h-headers/BigHeader.svelte";
    import CardList from "$lib/components/lists/CardList.svelte";
    import Card from "$lib/components/cards/Card.svelte";

    export let pageTitle = '';
    export let data = [];

    // стандартный текст и картинка для карточек свинок, ищущих дом
    data.map((article) => {
        if (!article.text) {
            article.text = 'Ищет самые лучшие ручки на свете';
        }
        if (!article.type) {
            article.type = 'ready';
        }
    });
</script>

<section>
    <div class="section-wrapper">

        <BigHeader textContent="{pageTitle}" position="left"/>

        <CardList>
            {#each data as article}
                <li>
                    <Card {article}/>
                </li>
            {/each}
        </CardList>
    </div>
</section>

<style>
    section {
        min-height: 100%;
        padding: 0 25%;
        background-color: aliceblue;
    }

    .section-wrapper {
        min-height: 100%;
        padding: 40px 5%;
    }
</style>