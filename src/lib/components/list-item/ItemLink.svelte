<script>
    export let text = '';
    export let href = '/';
</script>

<li class="option-item">
    <a class="option-item-link" {href}>
        {text}
    </a>
</li>

<style>
    .option-item {
        padding: 20px 80px;
        background-color: #FFFFFF;
        text-align: center;
        border-radius: 50px;
        box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.58);

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
    }
</style>