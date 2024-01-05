<script>
    export let alt = 'Изображение';
	export let pic;
	export let width = 200;
	export let height = 200;
</script>

<div class="image-wrapper" aria-roledescription="Посмотреть фото">
    <img src={'https://8393e96b-2841-4ffe-93df-baf53fa0b998-00-2174wtn3teowp.riker.replit.dev/web/img/' + pic + '.jpg'} class="photo-card" {width} {height} {alt}>
</div>

<style>
    .image-wrapper {
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
</style>
