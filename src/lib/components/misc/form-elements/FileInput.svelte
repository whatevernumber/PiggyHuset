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
				min-height: 26px;
        display: inline-block;
        cursor: pointer;
        font-size: 12px;
        vertical-align: middle;
        color: #FFFFFF;
        text-align: center;
        border-radius: 4px;
        background-color: #EF8653;
        line-height: 26px;
        padding: 5px 10px;
				text-transform: uppercase;
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