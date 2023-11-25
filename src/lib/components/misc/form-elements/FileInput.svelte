<script>
	export let name = "photo"
</script>

<label class="input-file">
	<input type="file">
	<span>Выберите фото</span>
</label>

<style>
    .input-file {
        position: relative;
    }

    .input-file span {
        width: 100px;
        display: inline-block;
        cursor: pointer;
        font-size: 14px;
        vertical-align: middle;
        color: #FFFFFF;
        text-align: center;
        border-radius: 4px;
        background-color: #EF8653;
        line-height: 22px;
        padding: 5px 10px;
    }

    .input-file input[type=file] {
        position: absolute;
        z-index: -1;
        opacity: 0;
        display: block;
        width: 0;
        height: 0;
    }

</style>