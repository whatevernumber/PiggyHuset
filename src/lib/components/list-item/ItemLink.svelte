<script>
    export let text;
    export let href = '/';
    export let icon = 'list-icon-pink.png';
    let background_icon_url = "url('src/lib/img/" + icon + "')";
</script>

<a class="option-item-link" {href}>
    <li class="option-item" style="--background_url: {background_icon_url}">
        {text}
    </li>
</a>

<style>
    .option-item {
        position: relative;
        margin-left: 60px;
        padding: 17px 50px;
        background-color: #FFFFFF;
        text-align: center;
    }

    .option-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: -60px;
        width: 60px;
        height: 60px;
        background-image: var(--background_url);
    }

    .option-item:hover {
        background-color: #E1EDCE;
    }

    .option-item:active {
        background-color: #88AA4D;
    }

    .option-item:active .option-item-link {
        color: #FFFFFF;
    }

    .option-item-link {
        font-size: 18px;
        font-weight: bold;
        color: #88AA4D;
        box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.58);
    }
</style>

