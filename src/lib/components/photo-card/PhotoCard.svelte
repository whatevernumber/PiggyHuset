<script>
	export let alt = 'Изображение';
	export let pic = 'temp-pig-photo.png'
	export let src = '/src/lib/img/' + pic;
	export let width = 193;
	export let height = 171;
</script>

<img {src} class="photo-card" {width} {height} {alt}>
