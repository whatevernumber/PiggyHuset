<script>
    import BigHeader from "$lib/components/misc/h-headers/BigHeader.svelte";
    import CardList from "$lib/components/lists/CardList.svelte";
    import Card from "$lib/components/cards/Card.svelte";

    export let page_title;

    export let data = [];

    export let admin = false;

    export let category;

    export let button_text;
    export let default_picture;

    // стандартный текст и картинка для карточек свинок, ищущих дом
    data.map((data) => {
        if (!data.text) {
            data.text = 'Ищет самые лучшие ручки на свете';
        }
        if (!data.type) {
            data.type = 'ready';
        }
    });
</script>

<section>
    <div class="section-wrapper">

        <BigHeader text_content="{page_title}" position="left"/>

        <CardList>
            {#each data as article}
                <li>
                    <Card {article} {default_picture} {category} {button_text} {admin} />
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