<script>
    import {onMount} from "svelte";

    export let filter_handler;
    export let active_only = false; // только кураторы с подопечными

    let overseers = [];
    let cities = [];
    let current_sex = null;

    onMount(async () => {
        const city_list = await fetch('/api/cities');

        if (city_list.ok) {
            cities = await city_list.json();
        }

        let query = '';

        if (active_only) {
            query += '?q=active';
        }

        let get_overseers = await fetch('/api/overseers' + query);

        if (get_overseers.ok) {
            overseers = await get_overseers.json();
        }
    });

    const toggleRadio = (evt) => {
        filter_handler(evt, current_sex);
        current_sex = evt.target.value;
    }

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
                        <input type="checkbox" name="city_name" value="{city.city_name}"
                               on:change={(evt) => filter_handler(evt)}>
                    </label>
                </li>
            {/each}
        </ul>
    </li>
    <li>
        <h4>По полу</h4>
        <ul class="sex_list">
            <li>
                <label class="radio_label">
                    <input name="sex" type="radio" value="F" on:change={(evt) => toggleRadio(evt)}>
                    <span>Самка</span>
                </label>
            </li>
            <li>
                <label class="radio_label">
                    <input name="sex" type="radio" value="M" on:change={(evt) => toggleRadio(evt)}>
                    <span>Самец</span>
                </label>
            </li>
            <li>
                <label class="radio_label">
                    <input name="sex" type="radio" value='' checked on:change={(evt) => toggleRadio(evt)}>
                    <span>Все</span>
                </label>
            </li>
        </ul>
    </li>
    <li>
        <h4>По кураторам</h4>
        <ul class="overseers-list">
            {#if active_only}
                {#each overseers as overseer}
                    <li class="overseer">
                        <label class="filter-list-label overseer-label">
                            Домик {overseer.overseer_name.slice(overseer.overseer_name.lastIndexOf(' '))}
                            <input type="checkbox" value="{overseer.overseer_name}"
                                   on:change={(evt) => filter_handler(evt)}>
                        </label>
                    </li>
                {/each}
            {:else}
                <li>
                    <h5>Активные кураторы</h5>
                    <ul class="overseers-list-active">
                        {#each overseers as overseer}
                            {#if overseer.active}
                                <li class="overseer">
                                    <label class="filter-list-label overseer-label">
                                        Домик {overseer.overseer_name.slice(overseer.overseer_name.lastIndexOf(' '))}
                                        <input type="checkbox" value="{overseer.overseer_name}"
                                               on:change={(evt) => filter_handler(evt)}>
                                    </label>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </li>

                <li>
                    <h5>Неактивные кураторы</h5>
                    <ul class="overseers-list-active">
                        {#each overseers as overseer}
                            {#if !overseer.active}
                                <li class="overseer">
                                    <label class="filter-list-label overseer-label">
                                        Домик {overseer.overseer_name.slice(overseer.overseer_name.lastIndexOf(' '))}
                                        <input type="checkbox" value="{overseer.overseer_name}"
                                               on:change={(evt) => filter_handler(evt)}>
                                    </label>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </li>
            {/if}
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

    h5 {
        color: #D97544;
        margin: 0 0 15px;
    }

    .filter-list,
    .filter-list ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        margin: 0;
    }

    .filter-list ul {
        row-gap: 15px;
    }

    ul.cities-list,
    ul.overseers-list,
    ul.sex_list {
        padding: 10px;
        width: 95%;
        font-size: 15px;
        row-gap: 15px;
        background-color: aliceblue;
    }

    .filter-list ul input[type="checkbox"] {
        display: none;
    }

    .filter-list ul input[type="radio"] {
        cursor: pointer;
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

    /* по какой-то причине правило не работает, если не задать ему высокую специфичность */
    :global(.filter-list-label.checked.checked::before) {
        background-image: url("/img/checked.png");
    }

    ul.cities-list,
    .overseers-list ul {
        display: grid;
        grid-template-columns: 7vw 7vw;
        align-items: center;
        column-gap: 5px;
    }

    .radio_label {
        display: flex;
        position: relative;
    }

    .radio_label input[type='radio'] {
        display: none;
    }

    .radio_label span::before {
        content: '';
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: 10px;
        border: 1px solid #88aa4d;
        vertical-align: middle;
        cursor: pointer;
    }

    .radio_label:hover span::before {
        border-color: #D97544;
    }

    input[type='radio']:checked + span::after {
        opacity: 1;
    }

    input[type="radio"]:checked + span:before {
        background-color: rgba(197, 205, 158, 0.57);
    }

    @media (min-width: 1001px) and (max-width: 1441px) {
        .cities-list,
        .overseers-list ul {
            grid-template-columns: auto;
        }
    }

    @media (max-width: 1001px) {
        .filter-list {
            font-size: 14px;
        }

        ul.cities-list,
        .overseers-list ul {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            column-gap: 5px;
        }
    }
</style>