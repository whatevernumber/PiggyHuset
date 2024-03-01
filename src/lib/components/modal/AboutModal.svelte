<script>
    import ButtonWithIcons from "$lib/components/misc/button/ButtonWithIcons.svelte";
    import {closeModal} from "$lib/components/utils/func.js";
    import CloseButton from "$lib/components/misc/button/CloseButton.svelte";
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
            <p class="about_text">В разделе <a class='articles-link' href="/articles"><i>статьи</i></a> нашего сайта Вы сможете узнать о правильном содержании, уходе и кормлении морских свинок.</p>
        </div>
        <ButtonWithIcons title="Написать нам" background_color="#E1EDCE" text_color="#333333" isModal href="https://vk.com/im?sel=-127412463" external />
        <CloseButton click_handler="{closeModal}" aria_description="Закрыть окно с информацией" />
    </div>
</section>

<style>
    .about_modal {
        position: fixed;
        text-align: center;
        top: 10%;
        left: 0;
        right: 0;
        margin: 0 auto;
        background-color: #FFFFFF;
        padding: 15px 25px;
        width: 550px;
        min-height: 550px;
        border: 1px solid #e1edce;
        z-index: 10;
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

    .articles-link {
        color: #EF8653;
    }

    @media (max-width: 1001px) {
        .about_modal {
            width: 80vw;
            max-height: 90vh;
            top: 50%;
            left: 0;
            right: 0;
            padding-bottom: 35px;
            margin-top: -315px;
            margin-left: auto;
            margin-right: auto;
        }

        .about_modal_text {
            font-size: 16px;
            margin-bottom: 8%;
        }
    }
</style>