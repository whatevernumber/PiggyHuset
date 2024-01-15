<script>

	export let onclick;

</script>
<div class='emoji_button' on:click={onclick}></div>

<style>
    .emoji_button {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 13px;
        bottom: 5px;
        background-image: url("/src/lib/img/smile.png");
        background-position: center;
        background-size: 18px 18px;
        background-repeat: no-repeat;
    }

    .emoji_button:hover {
        border-radius: 50%;
        background-color: #EF8653;
    }

</style>