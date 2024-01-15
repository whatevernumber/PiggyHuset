<script>
    import {_REMOTE_SERVER} from "$env/static/public";

    export let alt = '';
	export let pic;
	export let width = 200;
	export let height = 200;
    export let type = 'pig';
    export let src = (pic && pic !== undefined) ? `${_REMOTE_SERVER}/img/${pic}.jpg` : `../src/lib/img/placeholder/${type}.png`;

    // let pics = {
    //     article: 'article-pig.png',
    //     profile: 'temp-pig-profile-photo.png',
    //     graduated: 'found-home.png',
    //     ready: 'ready.jpg',
    //     kb_pig: 'kb-pig.png',
    //     temp: 'temp-pig-profile-photo.png',
    // }

    if (pic && pic !== undefined) {
        pic = _REMOTE_SERVER + '/img/' + pic + '.jpg';
    } else {
        pic = '../src/lib/img/placeholder/' + type + '.png';
    }

</script>

<div class="image-wrapper" aria-roledescription="Посмотреть фото">
    <img {src} class="photo-card" {width} {height} {alt}>
</div>

<style>
    .image-wrapper {
        display: flex;
        justify-content: center;
    }

    .photo-card {
        object-fit: cover;
    }
</style>
