<script>
    import Button from "$lib/components/misc/button/Button.svelte";
    import BigHeader from "$lib/components/misc/h-headers/BigHeader.svelte";
    import {showModal} from "$lib/components/utils/func.js";

    export let modal_opened;

    // Показать модальное окно
    const handle = (evt) => {
        showModal(evt, 'about_modal');
        evt.target.removeEventListener('click', handle);
        modal_opened = true;
        document.addEventListener('click', hide_overlay);
    }

    // прячет оверлей, если модальное окно закрыто
    const hide_overlay = () => {
        const modal = document.querySelector('.modal_opened');

        if (!modal) {
            modal_opened = false;
            document.removeEventListener('click', hide_overlay)
        }
    }
</script>

<section class="about_wrapper">
    <BigHeader text_content="О нас" />
    <div class="about_text_wrapper">
        <p class="about_text"><b>ДОМИК</b> для бездомных поросят – это проект помощи морским свинкам, попавшим в беду.</p>
        <p class="about_text">Если Вы нашли морскую свинку и не знаете, что с ней делать, – обратитесь к нам!</p>
        <p class="about_text">Если Вы не можете больше держать свинку у себя дома – мы примем её к себе и найдём новый дом.</p>
        <p class="about_text">Связаться с нами можно в нашем <a href="https://vk.com/domiksvinok" rel="nofollow" target="_blank">сообществе "ВК".</a></p>
        <img class='about_home_icon' src="/img/about-icon.png" height="80" alt="Маленький домик">
        <div class="button_wrapper">
            <Button title="Подробнее" is_light onclick={handle} />
        </div>
    </div>
</section>

<style>

    .about_wrapper {
        padding: 40px 80px 10px;
    }

    .about_text_wrapper {
        position: relative;
        padding: 27px 27px;
        background-color: #E1EDCE;
        box-shadow: 1px 1px 15px #adadad;
    }

    .about_text_wrapper a {
        color: #D97544;
    }

    .about_text {
        font-size: 22px;
        margin: 5px 0;
        line-height: 35px;
        text-align: justify;
    }

    .about_home_icon {
        position: absolute;
        top: 4%;
        right: 3%;
    }

    .button_wrapper {
        margin-top: 30px;
        text-align: center;
    }

    @media (max-width: 1001px) {
        .about_wrapper {
            margin-top: 25px;
            padding: 0;
            max-width: 100%;
        }

        .about_home_icon {
            display: none;
        }
    }
</style>