<script>
    import PigCard from "../pig-card/PigCard.svelte";
    import Button from "../button/Button.svelte";
</script>

<section class="looking_for_home">
    <h2 class="looking_for_home_header"> Ищут дом</h2>
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

    .looking_for_home_header {
        margin-bottom: 40px;
        font-size: 36px;
        font-weight: 700;
        line-height: 115%;
        text-align: center;
        text-transform: uppercase;
    }

    .looking_for_home_wrapper {
        display: flex;
        flex-wrap: wrap;
        column-gap: 25px;
        row-gap: 40px;
        margin-bottom: 40px;
    }

</style>