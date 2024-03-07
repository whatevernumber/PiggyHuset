<script>
    import {onMount} from "svelte";
    import {_REMOTE_SERVER} from "$env/static/public";

    export let filter_handler;

    let cities = [];
    let overseers = [];

    onMount(async () => {
        const city_list = await fetch(_REMOTE_SERVER + '/cities');

        if (city_list.ok) {
            cities = await city_list.json();
        }

        const overseer_list = await fetch(_REMOTE_SERVER + '/overseers');

        if (overseer_list.ok) {
            overseers = await overseer_list.json();
        }
    })
</script>

<h3>Выбрать из списка:</h3>
<ul class="filter-list">
    <li>
        <h4>По городам</h4>
        <ul class="cities-list">
        {#each cities as city}
            <li class="city">
                <label class="filter-list-label city-label">
                    {city.city_name}
                    <input type="checkbox" name="city_name" value="{city.city_name}" on:change={(evt) => filter_handler(evt)}>
                </label>
            </li>
        {/each}
        </ul>
    </li>
    <li>
        <h4>По кураторам</h4>
        <ul class="overseers-list">
            {#each overseers as overseer}
                <li class="overseer">
                    <label class="filter-list-label overseer-label">
                        Домик {overseer.overseer_name.slice(overseer.overseer_name.lastIndexOf(' '))}
                        <input type="checkbox" value="{overseer.overseer_name}" on:change={(evt) => filter_handler(evt)}>
                    </label>
                </li>
            {/each}
        </ul>
    </li>
</ul>

<style>
    h3 {
        color: #D97544;
    }

    h4 {
        color: #3f3f3f;
        margin: 15px 0;
    }

    .filter-list,
    .filter-list ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        margin: 0;
    }

    ul.cities-list,
    ul.overseers-list {
        padding: 10px;
        width: 90%;
        row-gap: 5px;
        background-color: aliceblue;
    }

    .filter-list ul input[type="checkbox"] {
        display: none;
    }

    .filter-list-label {
        display: flex;
        flex-direction: row;
        font-family: Jost, Arial, sans-serif;
    }

    .filter-list-label::before {
        content: "";
        width: 20px;
        height: 20px;
        align-self: center;
        display: block;
        margin-right: 5px;
        background-image: url("/img/unchecked.png");
        background-size: cover;
    }

    .filter-list-label:has(:checked)::before {
        background-image: url("/img/checked.png");
    }
</style>