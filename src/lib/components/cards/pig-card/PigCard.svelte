<script>
    import EditButton from '$lib/components/misc/button/EditButton.svelte';
</script>

<div class="pig_card">
    <div class="pig_card_header">
        <a class="pig_card_image" href="/static">
            <img class="pig_avatar" src="/src/lib/img/svg/pig_card_avatar.svg" width="60" height="60">
        </a>
        <p class="pig_name">
            <a class="pig_card_pig_name" href="/static">Финик</a>
        </p>
    </div>
    {#if true}
    <img class="house_icon" src="/src/lib/img/svg/home.svg">
    {/if}
    <div>
        <p class="pig_description">
            Описание морской свинки.
        </p>
    </div>
    {#if true}
    <div class="edit_button_wrapper">
        <EditButton button_name='edit' />
    </div>
    {/if}
</div>

<style>
    .pig_card {
        position: relative;
        padding: 20px 20px;
        min-width: 500px;
        min-height: 157px;
        background-color: #F9EEE1;
    }

    .pig_card_header {
        display: flex;
        column-gap: 20px;
        margin-bottom: 15px;
    }

    .pig_name {
        padding: 2px 10px;
        background-color: #D97544;
        align-self: flex-start;
        font-size: 18px;
        line-height: 140%;
    }

    .pig_card_pig_name {
        color: #FFFFFF;
    }

    .house_icon {
        position: absolute;
        top: 9%;
        right: 3%;

    }
</style>