<script>
    import PigCard from "../cards/pig-card/PigCard.svelte";
    import Button from "../misc/button/Button.svelte";
    import BigHeader from "$lib/components/misc/h-headers/BigHeader.svelte";
</script>

<section class="looking_for_home">
    <BigHeader textContent="Ищут дом" />
    <div class="looking_for_home_wrapper">
        <PigCard />
        <PigCard />
        <PigCard />
        <PigCard />
    </div>
    <Button title="Ищут дом" background_color="#D97544" text_color="#FFFFFF" />
</section>

<style>
    .looking_for_home {
        margin: 40px auto;
        padding: 0 80px;
    }

    .looking_for_home_wrapper {
        display: flex;
        flex-wrap: wrap;
        column-gap: 25px;
        row-gap: 40px;
        margin-bottom: 40px;
    }

</style>