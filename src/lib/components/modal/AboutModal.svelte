<script>

import ButtonWithIcons from "$lib/components/misc/button/ButtonWithIcons.svelte";

    let closeModal = function () {
        let modal = document.querySelector('.about_modal');
        let wrapper = document.querySelector('.landing_main_wrapper');
        modal.classList.add('modal_closed');
        wrapper.classList.remove('grey_wrapper');
    };
</script>

<section class="about_modal modal_closed">
    <div class="about_modal_wrapper">
        <h3 class="about_header">О нас</h3>
        <div class="about_modal_text">
            <p class="modal_text">
                Мы -- группа волонтёров, помогающих бездомным морским свинкам найти новый дом. Перед тем, как отдать свинку,
                мы проводим полное обследование у ветеринара. Если свинке требуется помощь, мы сначала пролечиваем её,
                и только потом ищем новый дом.
                <span class="house_name">"ДОМИК"</span> существует исключительно на личные средства кураторов и прибыль, полученную от продажи различных товаров
                в нашей группе, таких как: гамочки, лежанки, клетки, специальные корма.
            </p>
            <p class="modal_text">
                Мы не выкупаем свинок из плохих условий, с "Авито" и других подобных площадок.
            </p>
            <p class="modal_text">
                Пожалуйста, не присылайте ссылки на такие объявления!
            </p>
            <p class="modal_text">
                Если Вы увидели свинку в беде и готовы выкупить её на собственные средства, Вы можете передать её в "Домик" и мы
                найдём для неё новый дом.
            </p>
            <p class="bonus_text">
                Если вы выкупили свинку из плохих условий, поддавшись мимолетному желанию, но не можете оставить ее себе, СОБЕРИТЕ СВОЁ БИНГО!!!
            </p>

            <p class="modal_text last_text">
                Если Вы хотите помочь проекту, Вы можете приобрести и подарить нам лекарства для наших подопечных, корм, сено или опилки.
                Подробнее о том, что необходимо <span class="house_name">"ДОМИКУ"</span>, вы можете узнать в нашем сообществе <a class="modal_link" href="vk.com">ВК</a>.
            </p>
        </div>
        <ButtonWithIcons title="Написать нам" background_color="#E1EDCE" text_color="#333333" isModal/>
        <div class="close-button" on:click={closeModal}>
            <span hidden>
                закрыть
            </span>
        </div>
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

    .modal_closed {
        display: none;
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
        background: url('../src/lib/img/x.png') no-repeat;
    }

    .close-button:hover {
        scale: 1.2;
        transition: 0.5s;
    }

</style>