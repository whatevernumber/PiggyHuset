<script>
    export let picture = 'kb-pig.png';
    export let src = '/src/lib/img/' + picture;
</script>

<div class="graduated_card">
    <img {src} alt="Изображение выпускника">
    <p class="graduated_name">
        <a href="#">Финик</a>
    </p>
</div>

<style>
    .graduated_card {
        min-height: 290px;
        width: 254px;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .graduated_name {
        text-transform: uppercase;
    }
</style>