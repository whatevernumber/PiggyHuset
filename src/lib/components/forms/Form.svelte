<script>
    import PhotoCard from "$lib/components/photo-card/PhotoCard.svelte";
    import SubmitButton from "$lib/components/misc/form-elements/SubmitButton.svelte";
    import FileInput from "$lib/components/misc/form-elements/FileInput.svelte";
    import {_REMOTE_SERVER} from "$env/static/public";
    import {redirect, showModal} from "$lib/components/utils/func.js";
    import EmojiButton from '$lib/components/misc/button/EmojiButton.svelte';
    import EmojiPicker from '$lib/components/picker/EmojiPicker.svelte';

    export let scheme = {};
    export let redirect_location = '/';

    let image_upload_preview = [];

    let errors = {};

    const open_emoji = (evt) => {
        showModal(evt, 'emoji_wrapper')
    }

    const get_scheme = function* (fields) {
        for (let i = 0; i < fields.length; i++) {
            yield fields[i];
        }

        return field;
    }

    let generator = get_scheme(scheme.fields);
    let field = generator.next().value;

    const textarea = scheme.fields.find(field => field.type === 'textarea');
    const bottom_fields = [...get_scheme(scheme.fields)].slice(3);

    async function sendForm () {
        const form = document.querySelector('form');
        const formData = new FormData(form);
        const res = await fetch(_REMOTE_SERVER + scheme.endpoint, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        if (res.ok) {
            const success = await res.json();
            redirect(`${redirect_location}/${success.id}`, 2500);
        } else {
            errors = await res.json();

            for (const prop in errors) {
                const field = document.querySelector(`[name=${prop}]`);
                const label = document.querySelector(`[name=${prop}] ~ .input-error-label`);
                label.textContent = errors[prop];
                console.log(errors);
                field.classList.add('input-error');
            }
        }
    }

    const preview = function (evt) {
        // очистка списка файлов
        image_upload_preview = [];

        const file_input = document.querySelector('input[type="file"]');

        // отмена показа ошибки валидации
        if (file_input.classList.contains('input-error')) {
            file_input.classList.remove('input-error');
            document.querySelector('input[type="file"] ~ .input-error-label').style.display = 'none';
        }

        // генерация URL картинок
        for (const file of file_input.files) {
            if (file.type.startsWith('image')) {
                image_upload_preview.push(URL.createObjectURL(file));
            }
        }

        // re-render
        image_upload_preview = image_upload_preview;
    }
</script>

<section class="form-section">
    <h3 class="form-header">{scheme.title}</h3>
    <form class="form-scheme" enctype="multipart/form-data">
        <fieldset class="label-group">
            {#if !field.done}
                {@const required = field.required}
            <div class="form-item">
                <label class="form-label label-pig-name" for="{field.name}">{field.label}</label>
                <input class="form-input-field" type="{field.type ?? 'text'}" id="{field.name}" name="{field.name}" {required} placeholder="{field.required ? (field.placeholder ?? ' ') : '(необязательно)'}">
                <span class="input-error-label"></span>
            </div>
            {/if}

        {#if !field.done}
            {@const field = generator.next().value}
            {@const required = field.required}
            <div class="form-item">
                <label class="form-label label-pig-name" for="{field.name}">{field.label}</label>
                <input class="form-input-field" type="{field.type ?? 'text'}" id="{field.name}" name="{field.name}" {required} placeholder="{field.required ? (field.placeholder ?? ' ') : '(необязательно)'}">
                <span class="input-error-label"></span>
            </div>
        {/if}
        </fieldset>

        {#if textarea}
            {@const required = textarea.required ?? false}
        <fieldset class="label-group middle-group">
            <div class="form-item animal-health-set">
                <label class="form-label" for="animal-health">{textarea.label}</label>
                <textarea class="form-input-field" id="animal-health" name="description" placeholder="{textarea.placeholder ?? ' '}" {required}></textarea>
                <span class="input-error-label"></span>
                <EmojiButton onclick={open_emoji} />
                <EmojiPicker />
            </div>
        </fieldset>
        {/if}

        <fieldset class="bottom-fields">
        {#if bottom_fields}
            {#each bottom_fields as field}
                {@const required = field.required}
            <div class="form-item">
                <label class="form-label label-pig-name" for="{field.name}">{field.label}</label>
                <input class="form-input-field" type="{field.type ?? 'text'}" id="{field.name}" name="{field.name}" {required} placeholder="{field.required ? (field.placeholder ?? ' ') : '(необязательно)'}">
            </div>
            <span class="input-error-label"></span>
            {/each}
        {/if}
        </fieldset>

        <fieldset class="label-group">
        {#if scheme.files.file_input}
            <FileInput class_name="form-input-field" name="files" multiple onchange="{preview}" />
        {/if}
            <div class="form-item button">
                <SubmitButton on_click="{ sendForm }" />
            </div>
        </fieldset>
        {#if image_upload_preview.length}
            <div class="photo_preview">
                {#each image_upload_preview as src}
                    <PhotoCard {src} width='80px' height='80px' />
                {/each}
            </div>
        {/if}
    </form>
</section>

<style>
    .form-section {
        width: 600px;
        max-width: 600px;
        padding: 20px 40px;
        margin: auto auto;
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

    .form-scheme {
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
        justify-content: space-between;
        position: relative;
    }

    .button {
        justify-content: flex-end;
    }

    .form-label {
        text-transform: uppercase;
        flex-basis: 70px;
    }

    .form-label:has(~ textarea) {
        align-self: center;
        flex-basis: 40px;
    }

    .form-scheme input,
    .form-scheme textarea {
        flex-grow: 1;
        font-family: Jost, sans-serif;
        font-size: 17px;
        color: #3f3f3f;
        background-color: rgba(225, 237, 206, 0.5);
        border: none;
    }

    .form-scheme input {
        height: 43px;
        /*text-indent: 10%;*/
        padding: 0 5%;
        margin-left: 10px;
    }

    .form-scheme textarea {
        flex-grow: 2;
        max-width: 566px;
        min-width: 566px;
        min-height: 180px;
        max-height: 800px;
        padding: 10px;
    }

    .form-scheme input::placeholder,
    .form-scheme textarea::placeholder {
        color: rgba(51, 51, 51, 0.7);
        font-weight: 400;
        font-size: 16px;
        text-align: center;
    }

    .bottom-fields {
        display: grid;
        row-gap: 25px;
    }

    .photo_preview {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        padding: 5px 13px;
    }

    .animal-health-set {
        flex-direction: column;
    }

    .form-input-field {
        width: 75%;
    }

    :global(form.form-scheme input[name].input-error),
    :global(form.form-scheme textarea[name].input-error) {
        outline: 2px inset #D97544;

        &:not(:placeholder-shown) {
             outline: none;

            &:not([type="file"]) ~ .input-error-label {
                  display: none;
            }
        }
    }

    :global(.input-error + .input-error-label) {
        color: #D97544;
        position: absolute;
        top: 102%;
    }

    :global(.input-error + .input-error-label::before) {
        content: '⛔';
        padding-right: 5px;
        fill: #e1edce;
    }

</style>