<script>
    import BigHeader from "$lib/components/misc/h-headers/BigHeader.svelte";
    import CardList from "$lib/components/lists/CardList.svelte";
    import Card from "$lib/components/cards/Card.svelte";
    import { showModal, removeData, closeModal } from '$lib/components/utils/func.js';
    import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';

    export let page_title;
    export let data = [];
    export let admin = true;
    export let category;
    export let button_text;
    export let type;

    // стандартный текст и картинка для карточек свинок, ищущих дом
    data.map((data) => {
        if (!data.text) {
            data.text = 'Ищет самые лучшие ручки на свете';
        }
        if (!data.type) {
            data.type = 'ready';
        }
    });

    let action;
    let success;

    const show_delete = (evt) => {
        action = 'delete';
        showModal(evt);
        evt.target.removeEventListener('click', show_delete);
        document.removeEventListener('click', closeModal);
    }

    const remove = () => {
        removeData('article', 5, success);

        if (success) {
            action = 'complete';
        } else {
            action = 'fail';
        }
    }

</script>
<div>
    <section>
        <div class="section-wrapper">

            <BigHeader text_content="{page_title}" position="left"/>

            <CardList>
                {#each data as article}
                    <li>
                        <Card {article} {type} {category} {button_text} {admin} delete_handler={show_delete} />
                    </li>
                {/each}
            </CardList>
        </div>
    </section>
</div>

<div class='modal modal_closed'>
    <ModalOkay {action} {success} action_handler={remove}/>
</div>

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

    .modal {
        position: fixed;
        top: 35%;
        left: 30%;
    }

    .modal_closed {
        display: none;
    }
</style>