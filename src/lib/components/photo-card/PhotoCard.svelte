<script>
    export let alt = 'Изображение';
	export let pic;
	export let width = 200;
	export let height = 200;
    export let photo_type;

    let pics = {
        article: 'article-pig.png',
        profile: 'temp-pig-profile-photo.png',
        kb_pig: 'kb-pig.png',
        graduated: 'found-home.png',
        ready: 'ready.jpg',
        temp_pig: 'temp-pig-profile-photo.png',
    }

    if (pic) {
        pic = 'https://8393e96b-2841-4ffe-93df-baf53fa0b998-00-2174wtn3teowp.riker.replit.dev/web/img/' + pic + '.jpg';
    } else {
        pic = '../src/lib/img/' + pics[photo_type];
    }

</script>

<div class="image-wrapper" aria-roledescription="Посмотреть фото">
    <img src={pic} class="photo-card" {width} {height} {alt}>
</div>

<style>
    .image-wrapper {
        display: flex;
        justify-content: center;
    }
</style>
