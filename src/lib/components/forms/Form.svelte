<script>
	import PhotoCard from "$lib/components/photo-card/PhotoCard.svelte";
	import SubmitButton from "$lib/components/misc/form-elements/SubmitButton.svelte";
	import FileInput from "$lib/components/misc/form-elements/FileInput.svelte";
    import {redirect} from "$lib/components/utils/func.js";
	import Emoji from '$lib/components/misc/emoji/Emoji.svelte';
    import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
    import TextEditor from "$lib/components/misc/form-elements/TextEditor.svelte";
    import {onMount} from "svelte";
    import {fade} from "svelte/transition";
    import {beforeNavigate} from "$app/navigation";
    import {page} from "$app/stores";
    import SelectInput from '../misc/form-elements/SelectInput.svelte';
    import UploadedFiles from '$lib/components/misc/form-elements/UploadedFiles.svelte';

	export let scheme = {};
	export let redirect_location;
    export let modal_message;
    export let method = 'POST';
    export let is_editing;
    export let pig; // array of photos to show in the preview
    export let article;
    export let product;

    let photos = [];

    pig ? photos = pig.photos.map(({ image }) => image) : null;
    article ? photos = article.photos.map(({ image }) => image) : null;

    // Уже имеющиеся в БД фотографии для отображения и отправки в скрытом поле
    $: old_photos = JSON.stringify(photos);

    const delete_handler = (image) => {
        photos = photos.filter(
            (element) => {
                return element !== image
            }
        )
    }

    let main_photo_name;
    let main_photo_index;

	let success;
    let wysiwyg_input;
    let dirty = false;
    let image_upload_preview = [];
    let errors = {};
    let window_width = 0;

    const select = scheme.fields.filter(field => field.type === 'select');
    const textarea = scheme.fields.filter(field => field.type === 'textarea');
    const wysiwyg = scheme.fields.filter(field => field.type === 'wysiwyg');
    const fields = scheme.fields.filter(field => !textarea.includes(field) && !wysiwyg.includes(field));

    const top_fields = fields.slice(0, 2);
    const bottom_fields = fields.filter(field => !top_fields.includes(field));

    let select_style;
    select_style = select ? 'select_group' : '';

    const handle = () => {

        if (redirect_location === 'info') {
            redirect('/info');
        } else {
            redirect(redirect_location ? `/${redirect_location}/${success.id || null}` : '/')
        }
    }

    const show_modal = () => {
        let modal = document.querySelector('.modal_closed');
        modal.classList.remove('modal_closed');
        modal.classList.add('modal_opened');
    }

    async function sendForm () {
        const form = document.querySelector('form');

        const wysiwig = form.querySelector('#wysiwyg');
        if (wysiwig) {
            form.querySelector('input[type="hidden"]').value;
        }

        const formData = new FormData(form);

        const res = await fetch('/api/' + scheme.endpoint, {
            method: method,
            body: formData
        });

        if (res.status === 401) {
            redirect('/')
        }

        if (res.ok) {
            success = await res.json();
            if (success.id) {
                show_modal();
                dirty = false;
                sessionStorage.setItem('referrer', $page.url.href);
            }
        } else {
            errors = await res.json();

            for (const prop in errors) {
                let files;
                if (prop === 'files') {
                    files = 'files[]';
                }

                const form = document.querySelector('form');
                const field = form.querySelector(`[name="${files || prop}"]`);
                const label = form.querySelector(`[name="${files || prop}"] ~ .input-error-label`);
                field.classList.add('input-error');
                label.textContent = errors[prop];
                field.value = '';
                field.addEventListener('change', function () {
                    field.classList.remove('input-error');
                    field.removeEventListener('change', this);
                });
            }
        }
    }

    const preview = function () {
        // очистка списка файлов
        image_upload_preview = [];

        const file_input = document.querySelector('input[type="file"]');

        // отмена показа ошибки валидации
        if (file_input.classList.contains('input-error')) {
            file_input.classList.remove('input-error');
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

    onMount(() => {
        wysiwyg_input = document.querySelector('input[type="hidden"]');

        // Прячем блок с датой выпуска, если свинка ещё не выпустилась
        let graduation_date = document.querySelector('input[name="graduation_date"]');

        if (graduation_date) {

            const AVAILABLE_STATUSES = [1, 5, 6];

            // Если нет свинки (для новых свинок) или если текущий статус свинки относится к актуальным, ищущим дом
            !pig || AVAILABLE_STATUSES.includes(parseInt(pig['status_id'])) ? graduation_date.parentNode.classList.add('hidden') : null;
        }
    });

    beforeNavigate(({ cancel }) => {
        if (dirty && !confirm('Вы уверены? Введённые данные не сохранятся.')) {
            cancel();
        }
    });
</script>

<svelte:window bind:innerWidth={window_width} />

<div class='form-container' transition:fade={{delay: 20, duration: 180}}>
    <section class="form-section">
        <h3 class="form-header">{scheme.title}</h3>
        <form class="form-scheme" enctype="multipart/form-data" on:input={() => dirty = true}>

            {#if top_fields}
            <fieldset class="label-group head-group {redirect_location === 'info' ? 'full-width' : ''}">
                {#each top_fields as field}
                    {#if field !== textarea && field !== select}
                        {@const required = field.required}
                <div class="form-item">
                    <label class="form-label" for="{field.name}">{field.label}</label>
                    <input class="form-input-field" type="{field.type ?? 'text'}" id="{field.name}" name="{field.name}" {required} placeholder="{field.required ? (field.placeholder ?? ' ') : '(необязательно)'}">
                    <span class="input-error-label"></span>
                </div>
                    {/if}
                {/each}
            </fieldset>
            {/if}

            <fieldset class="label-group middle-group">
                <div class="form-item field-textarea-set">
            {#if (textarea.length)}
            {#each textarea as textarea}
                {@const required = textarea.required ?? false}
                    <label class="form-label" for="{textarea.name}">{textarea.label}</label>
                    <textarea class="form-input-field" id="{textarea.name}" name="{textarea.name}" placeholder="{textarea.placeholder ?? ' '}" {required}></textarea>
                    <span class="input-error-label"></span>
                    {#if textarea.emoji && window_width > 1001}
                    <Emoji input_name={textarea.name} />
                    {/if}
            {/each}
            {:else if (wysiwyg.length)}
                {#each wysiwyg as wysiwyg}
                <label class="form-label" for="{wysiwyg.name}">{wysiwyg.label}</label>
                <input type="hidden" name="{wysiwyg.name}" id="{wysiwyg.name}">
                <span class="input-error-label"></span>
                <TextEditor input="{wysiwyg_input}" />
                {/each}
            {/if}
                </div>
            </fieldset>

            {#if bottom_fields.length}
            <fieldset class="bottom-fields {select_style} {redirect_location === 'info' ? 'full-width' : ''}">
                {#each bottom_fields as field}
                    {@const required = field.required}
                    {#if field.type === 'select'}
                        <div class="select_wrapper form-item">
                            <label class="form-label" for="{field.name}">{field.label}</label>
                            <SelectInput css_class="form-input-field" type={field.name} options="{field.options}" grouped="{field.grouped}" group_by="{field.group_column}" />
                        </div>
                    {:else if field.type === 'checkbox'}
                        <div class='checkbox_wrapper'>
                            <label class="form-label checkbox" for="{field.name}">{field.label}
                                <input type='hidden' value='0' name="{field.name}">
                                <input name="{field.name}" type="checkbox" value="1" id="{field.name}">
                                <span class="checkbox_box"></span>
                            </label>
                        </div>
                    {:else}
                <div class="form-item">
                    <label class="form-label" for="{field.name}">{field.label}</label>
                    <input class="form-input-field" type="{field.type ?? 'text'}" id="{field.name}" name="{field.name}" {required} placeholder="{field.required ? (field.placeholder ?? ' ') : '(необязательно)'}">
                    <span class="input-error-label"></span>
                </div>
                    {/if}
                {/each}
            </fieldset>
            {/if}
            <fieldset class="label-group file-fieldset">
            {#if scheme.files.file_input}
                <FileInput class_name="form-input-field" name="{scheme.files.multiple ? 'files[]' : 'file'}" multiple={scheme.files.multiple} onchange="{preview}" />
            {/if}
                <div class="form-item button">
                    <SubmitButton on_click="{ sendForm }" />
                </div>
            </fieldset>
            {#if main_photo_index || main_photo_index === 0}
                <input type="hidden" class="main_photo" name="main_photo_index" bind:value={main_photo_index}>
            {/if}
            {#if photos.length && main_photo_name }
                <input type="hidden" class="main_photo_name" name="main_photo_name" bind:value={main_photo_name}>
            {/if}
            {#if is_editing}
                <input type="hidden" class="uploaded_photos" name="old_photos" bind:value={old_photos}/>
            {/if}
        </form>
        {#if image_upload_preview.length}
            <div class="photo_preview">
                {#each image_upload_preview as src, index (index)}
                    <PhotoCard {src} {index} width="80px" height="80px" bind:main_photo={main_photo_index} bind:old_photo_name={main_photo_name} form_photo_type="new" />
                {/each}
            </div>
        {/if}
        {#if photos.length}
            <UploadedFiles handler={delete_handler} bind:photos bind:old_photo_name={main_photo_name} bind:main_photo={main_photo_index} />
        {/if}
        {#if product && product.main_photo && !image_upload_preview.length}
            <PhotoCard pic={product.main_photo} type="food" width="80px" height="80px" />
        {/if}
    </section>
    <slot />
</div>

<div class="modal modal_closed">
    <ModalOkay desc={modal_message} sent_handle={handle} success=true action="sent"/>
</div>

<style>

    :global([disabled]) {
        filter: saturate(0.1);
    }

    .form-container {
        min-height: 100%;
        margin: auto;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        justify-content: center;
        align-items: center;
        padding: 5%;
    }

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
        row-gap: 40px;
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
        flex-basis: 75px;
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

    .field-textarea-set {
        flex-direction: column;
    }

    .form-input-field {
        width: 75%;
    }

    .select_group {
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        column-gap: 5%;
    }

    .select_wrapper {
        display: flex;
        width: 275px;
    }

    :global(form.form-scheme input[name].input-error),
    :global(form.form-scheme textarea[name].input-error) {
        outline: 2px inset #D97544;
    }

    :global(form.form-scheme input[name].input-error):not(:placeholder-shown),
    :global(form.form-scheme textarea[name].input-error):not(:placeholder-shown) {
        outline: none;
    }

    :global(.input-error + .input-error-label) {
        display: block;
        color: #D97544;
        position: absolute;
        top: 102%;
    }

    :global(.input-error + .input-error-label::before) {
        content: '⛔';
        padding-right: 5px;
        fill: #e1edce;
    }

    :global(.input-error-label) {
        display: none;
    }

    .modal {
        position: absolute;
        top: 35%;
        left: 35%;
        z-index: 10;
    }

    .bottom-fields.select_group .form-item {
        max-width: 275px;
    }

    .bottom-fields.select_group .form-item input {
        -moz-appearance: textfield;
        -webkit-appearance: none;
    }

    .hidden {
        display: none;
    }

    .full-width {
        flex-direction: column;
        row-gap: 25px;
    }

    .full-width .form-item {
        min-width: 100%;
    }

    .full-width .form-input-field {
        max-width: 400px;
    }

    .checkbox {
        position: relative;
        margin-left: 10px;
        padding-left: 25px;
        cursor: pointer;
    }

    .checkbox input[type='checkbox'] {
        display: none;
    }

    .checkbox span::before {
        content: '';
        position: absolute;
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: 10px;
        left: -10px;
        border: 1px solid #88aa4d;
        vertical-align: middle;
        cursor: pointer;
    }

    .checkbox:hover span::before {
        border-color: #D97544;
    }

    /*.checkbox:hover span::after {*/
    /*    content: '';*/
    /*    position: absolute;*/
    /*    width: 6px;*/
    /*    height: 11px;*/
    /*    border: solid #88aa4d;*/
    /*    border-width: 0 3px 3px 0;*/
    /*    transform: rotate(45deg);*/
    /*    top: 10%;*/
    /*    left: -2px;*/
    /*    opacity: 0.5;*/
    /*}*/

    input[type='checkbox']:checked + span::after {
        opacity: 1;
    }

    input[type="checkbox"]:checked + span:before {
        background-color: rgba(255, 85, 22, 0.87);
    }

    .checkbox_wrapper {
        align-self: end;
    }

    @media (max-width: 1001px) {

        .form-container {
            margin: auto;
            max-width: 95vw;
            padding-top: 2%;
        }

        .form-header {
            margin: 0 auto;
            text-align: center;
            max-width: 220px;
        }

        .form-section {
            width: 100%;
            height: 100%;
            background-color: #FFFFFF;
            padding: 5px 0;
            margin-bottom: 5%;
        }

        .form-scheme textarea {
            flex-grow: 2;
            max-width: 88%;
            min-width:  88%;
            min-height: 300px;
            max-height: 500px;
            padding: 10px;
        }

        fieldset {
            border: none;
            display: flex;
            row-gap: 10px;
            align-items: center;
            flex-wrap: wrap;
        }

        .file-fieldset {
            flex-wrap: nowrap;
            align-items: baseline;
        }

        .form-item:has(.input-error) + .form-item {
            margin-top: 15%;
        }

        .select_group {
            justify-content: center;
        }

        .modal {
            left: 0;
        }

        .full-width {
            row-gap: 10px;
        }

        .full-width .form-item {
            min-width: 100%;
        }

        .full-width .form-input-field {
            max-width: 120px;
        }

    }

</style>