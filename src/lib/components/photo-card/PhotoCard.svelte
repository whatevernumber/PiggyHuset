<script>
    export let alt = 'Изображение';
	export let pic = 'pig-in-a-hat.jpeg'
	export let width = 200;
	export let height = 200;

    export let clickHandler;
</script>

<div class="image-wrapper" on:click={clickHandler} aria-roledescription="Посмотреть фото">
    <img src="{'/src/lib/img/' + pic}" class="photo-card" {width} {height} {alt}>
</div>

<style>
    .image-wrapper {
        cursor: pointer;
    }

    .image-wrapper:hover {
        filter: brightness(90%);
    }
</style>
