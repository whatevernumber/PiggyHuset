<script>
    import Button from "$lib/components/misc/button/Button.svelte";
    import BigHeader from "$lib/components/misc/h-headers/BigHeader.svelte";

    // Скрыть модальное окно
    let closeModal = function (evt) {
        if(document.querySelector('.grey_wrapper') && !evt.target.classList.contains('.about_modal') ) {
            let modal = document.querySelector('.about_modal');
            let wrapper = document.querySelector('.landing_main_wrapper');
            modal.classList.add('modal_closed');
            wrapper.classList.remove('grey_wrapper');
            wrapper.removeEventListener('click', closeModal)
        }
    }

    // Показать модальное окно
    function showModal(evt) {
            evt.stopPropagation();
            let modal = document.querySelector('.about_modal');
            let wrapper = document.querySelector('.landing_main_wrapper');
            modal.classList.remove('modal_closed');
            wrapper.classList.add('grey_wrapper');
            modal.scrollIntoView({block: "center"});
            wrapper.addEventListener('click', closeModal)
        }

</script>

<section class="about_wrapper">
    <BigHeader textContent="О нас" />
    <div class="about_text_wrapper">
        <p class="about_text"><b>ДОМИК</b> для бездомных поросят - это проект помощи морским свинкам, попавшим в беду.</p>
        <p class="about_text">Если Вы нашли свинку и не знаете, что с ней делать, -- обратитесь к нам!</p>
        <p class="about_text">Если Вы не можете больше держать морскую свинку у себя дома -- мы примем её к себе и найдём новый дом.</p>
        <p class="about_text">Связаться с нами можно в нашем сообществе
            <a href="https://vk.com">"ВК".</a>
        </p>
        <br>
        <p class="about_text">В разделе
            <a href="/">
            <em>статьи</em>
            </a>
            нашего сайты Вы сможете узнать о правильном содержании, уходе и кормлении морских свинок.</p>
            <img class='about_home_icon' src="src/lib/img/svg/home.svg" alt="Маленький домик">
        <div class="button_wrapper">
            <Button title="Подробнее" isLight onclick={showModal} />
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

    .about_text {
        font-size: 22px;
        margin: 5px 0;
        line-height: 35px;
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
</style>