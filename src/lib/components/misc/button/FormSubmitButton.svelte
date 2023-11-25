<script>
    export let image = 'submit';
    $: url = `url("/img/${image}.jpeg")`;
</script>

<div class="container" style="--button-image: {url}">
    <span class="image preceding"></span>
    <button class="form-submit-button">
        Отправить
    </button>
    <span class="image succeeding"></span>
</div>

<style>
    .container {
        display: flex;
        border: 1px solid #F6B5D3;
    }

    .form-submit-button {
        height: 60px;
        padding: 15px;
        color: #FFFFFF;
        background-color: #D97544;
        border: none;
        font-size: 16px;
        font-weight: 400;
        text-transform: uppercase;
    }

    .container:hover {
        border: #88aa4d 1px solid;
    }

    .image {
        display: flex;
        width: 60px;
        height: 60px;
        background-image: var(--button-image);
        background-size: cover;
    }

    .container:active .image {
        background-image: url("/img/submit-active.jpeg");
    }
</style>