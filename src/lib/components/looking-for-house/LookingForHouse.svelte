<script>
    import PigCard from "../pig-card/PigCard.svelte";
    import Button from "../button/Button.svelte";
</script>

<section class="looking_for_home">
    <h2 class="looking_for_home_header"> Ищут дом</h2>
    <div class="looking_for_home_wrapper">
        <a href="#">
            <img class="looking_for_home_img" src="/src/lib/img/looking-for-home.png" width="450px" height="450px" alt="Морская свинка ищет дом">
        </a>
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
        justify-content: center;
        column-gap: 25px;
        row-gap: 40px;
        margin-bottom: 40px;
    }

</style>