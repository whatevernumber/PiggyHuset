<script>
    export let title = 'кнопка';
    export let background_color = '#FFFFFF'
    export let text_color = '#D97544'
    export let href ='/'
</script>

<a class="button" {href} >
{title}
</a>

<style>
    .button {
        margin: 0 auto;
        display: block;
        padding: 15px 70px;
        max-width: 180px;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 700;
        background-color: #FFFFFF;
        color: #D97544;
    }

    .button:hover {
        background-color: #EF8653;
        box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.14) inset;
    }

    .button:active {
        background-color: #B25F36;
    }

</style>