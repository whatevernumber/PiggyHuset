<script>
    import Button from '$lib/components/misc/button/Button.svelte';
    import BigHeader from '$lib/components/misc/h-headers/BigHeader.svelte';
    import {Splide, SplideSlide} from "@splidejs/svelte-splide";
    import '@splidejs/svelte-splide/css/splide.min.css';
    import PhotoList from "$lib/components/photo-list/PhotoList.svelte";
</script>

<section class="looking_for_home">
    <BigHeader text_content="Ищут дом" />
    <PhotoList quantity="16" autoplay="{true}" first_slide="looking-for-home.png" no_border />
    <Button href="/looking-for-home" title="Ищут дом" background_color="#D97544" text_color="#FFFFFF" />
</section>

<style>

    .looking_for_home {
        margin: 40px auto;
        padding: 0 80px;
    }

    .looking_for_home_wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        column-gap: 25px;
        row-gap: 40px;
        margin-bottom: 40px;
    }

</style>