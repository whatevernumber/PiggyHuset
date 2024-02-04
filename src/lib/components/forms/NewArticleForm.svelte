<script>
    import Form from "$lib/components/forms/Form.svelte";

    export let title;
	export let method;
	export let endpoint = '/articles/type/1';
	export let old_photos;
	export let is_editing;
	let modal_message = 'Запись опубликована';

    const scheme = {
        title: title || 'Новая статья',
        endpoint: endpoint,
        fields: [
            {
                label: 'Заголовок статьи',
                name: 'title',
                required: true
            },
            {
                label: 'Текст статьи',
                name: 'text',
                type: 'textarea',
                required: true,
                emoji: true
            },
            {
                label: 'Автор',
                name: 'author'
            },
            {
                label: 'Источник (ссылка)',
                name: 'origin_link'
            },
        ],
        files: {
            file_input: true,
            multiple: true
        }
    }
</script>

<Form {scheme} {modal_message} {method} {is_editing} {old_photos} redirect_location="articles" />