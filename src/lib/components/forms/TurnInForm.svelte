<script>
    import FormSubmitButton from "$lib/components/misc/button/FormSubmitButton.svelte";
</script>

<section class="form-section">
    <h3 class="form-header">Форма для связи</h3>
    <p class="form-description">
        Если вы хотите передать нам свою свинку, пожалуйста,
        заполните данные о состоянии свинки и свой контактный номер.
        Вы также можете написать напрямую в сообщения в нашей группе ВК.
    </p>
    <form class="turn-in-form">
        <fieldset class="label-group">
            <div class="form-item">
                <label class="form-label" for="animal-name">Имя свинки</label>
                <input type="text" id="animal-name" placeholder="(Необязательно)">
            </div>

            <div class="form-item">
                <label class="form-label" for="animal-age">Возраст свинки</label>
                <input type="text" id="animal-age" placeholder="(Необязательно)">
            </div>
        </fieldset>

        <fieldset class="label-group middle-group">
            <div class="form-item">
                <label class="form-label" for="animal-health">Состояние здоровья</label>
                <textarea id="animal-health" placeholder="Пожалуйста, не утаивайте проблемы со здоровьем,{'\n'}мы всё равно о них узнаем.{'\n'}{'\n'}Так мы сможем лучше помочь животному"></textarea>
            </div>
        </fieldset>

        <fieldset class="label-group">
            <div class="form-item">
                <label class="form-label" for="human-name">Ваше имя</label>
                <input type="text" id="human-name" placeholder="(Необязательно)">
            </div>

            <div class="form-item">
                <label class="form-label" for="human-contacts">Контакты для связи</label>
                <input type="text" id="human-contacts">
            </div>
        </fieldset>

        <fieldset class="label-group">
            <div class="form-item">
                <label class="form-label" for="form-photo">Фото</label>
                <div class="form-photo" id="form-photo"></div>
            </div>

            <div class="form-item">
                <FormSubmitButton />
            </div>
        </fieldset>
    </form>
</section>

<style>
    .form-section {
        max-width: 600px;
        padding: 20px 40px;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        background-color: #FFFFFF;
    }

    .form-header {
        font-size: 24px;
        line-height: 130%;
        text-transform: uppercase;
    }

    .turn-in-form {
        display: grid;
        row-gap: 20px;
        align-items: stretch;
    }

    fieldset {
        border: none;
        display: flex;
        column-gap: 10px;
        align-items: center;
    }

    .form-item {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .form-label {
        text-transform: uppercase;
        flex-basis: 100px;
    }

    .form-label[for="animal-health"] {
        align-self: baseline;
    }

    .turn-in-form input,
    .turn-in-form textarea {
        background-color: rgba(225, 237, 206, 0.5);
        border: none;
        flex-grow: 1;
    }

    .turn-in-form input {
        height: 43px;
        text-indent: 10%;
    }

    .turn-in-form textarea {
        flex-grow: 2;
        max-width: 452px;
        min-height: 120px;
        max-height: 200px;
        padding: 10px;
    }

    .turn-in-form input::placeholder,
    .turn-in-form textarea::placeholder {
        color: rgba(51, 51, 51, 0.7);
        /*text-transform: uppercase;*/
        font-weight: 400;
        font-size: 16px;
    }

    .form-photo {
        width: 80px;
        height: 80px;
        background-color: rgba(225, 237, 206, 0.5);
    }
</style>