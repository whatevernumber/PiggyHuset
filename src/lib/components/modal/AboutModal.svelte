<script>

import ButtonWithIcons from "$lib/components/misc/button/ButtonWithIcons.svelte";
import {closeModal} from "$lib/components/utils/func.js";

</script>

<section class="about_modal modal modal_closed">
    <div class="about_modal_wrapper modal_wrapper" style="filter: none;">
        <h3 class="about_header">О нас</h3>
        <div class="about_modal_text">
            <p>
                Мы <strong>не</strong> собираем деньги на лечение и содержание!
                <span class="house_name">"ДОМИК"</span> существует исключительно на личные средства кураторов и прибыль, полученную от продажи различных товаров
                в нашей группе, таких как: гамачки, лежанки, клетки, специальные корма.
            </p>
            <br>
            <p class="modal_text">
                Мы не выкупаем свинок из плохих условий, с "Авито" и других подобных площадок.
                Пожалуйста, не присылайте ссылки на такие объявления!
            </p>
            <p class="modal_text">
                Если Вы увидели свинку в беде и готовы выкупить её на собственные средства, Вы можете передать её в <span class="house_name">"ДОМИК"</span> – и мы
                найдём для неё новый дом.
            </p>
            <p class="modal_text">
                Основной центр <span class="house_name">"ДОМИКА"</span> – в Москве, филиалы – Санкт-Петербург и Сочи.
            </p>
            <p class="about_text">В разделе <a href="/articles"><i>статьи</i></a> нашего сайта Вы сможете узнать о правильном содержании, уходе и кормлении морских свинок.</p>
        </div>
        <ButtonWithIcons title="Написать нам" background_color="#E1EDCE" text_color="#333333" isModal/>
        <button class="close-button" on:click={closeModal} aria-roledescription="Закрыть окно с информацией">
            <span hidden>
                закрыть
            </span>
        </button>
    </div>
</section>

<style>

    .about_modal {
        position: absolute;
        text-align: center;
        top: 80%;
        right: 35%;
        background-color: #FFFFFF;
        padding: 15px 25px;
        width: 550px;
        min-height: 680px;
        border: 1px solid rgba(0, 0, 0, 0.10);
    }

    .about_header {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 700;
        line-height: 130%;
        text-transform: uppercase;
    }

    .about_modal_text {
        margin-bottom: 50px;
        font-size: 18px;
        font-weight: 400;
        line-height: 130%; /* 23.4px */
        text-align: justify;
    }

    .about_modal_wrapper {
        position: relative;
    }

    .modal_text {
        margin-bottom: 10px;
    }

    .modal_link {
        color: #88aa4d;
        text-decoration: underline;
    }

    .last_text {
        margin: 0;
    }

    .bonus_text {
        text-decoration: line-through;
    }

    .house_name {
        font-weight: 500;
    }

    .close-button {
        position: absolute;
        width: 35px;
        height: 35px;
        top: -2.5%;
        right: -15%;
        background: url('$lib/img/x.png') no-repeat;
        border: none;
    }

    .close-button:hover {
        scale: 1.2;
        transition: 0.5s;
    }

    @media (max-width: 1001px) {
        .about_modal {
            width: 90%;
            right: 0;
            padding-bottom: 40px;
        }

        .close-button {
            top: -1%;
            right: -3%;
        }
    }

</style>