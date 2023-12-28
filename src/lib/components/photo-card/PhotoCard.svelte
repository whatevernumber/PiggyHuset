<script>
    export let alt = 'Изображение';
	export let pic = 'pig-in-a-hat.jpeg'
	export let width = 200;
	export let height = 200;
</script>

<div class="image-wrapper" aria-roledescription="Посмотреть фото">
    <img src="{'/src/lib/img/' + pic}" class="photo-card" {width} {height} {alt}>
</div>

<style>
    .image-wrapper {
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
</style>
