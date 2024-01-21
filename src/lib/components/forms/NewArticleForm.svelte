<script>
    import Form from "$lib/components/forms/Form.svelte";

    export let title;
	let modal_message = 'Новая запись успешно добавлена';

    const scheme = {
        title: title || 'Новая статья',
        endpoint: '/articles/type/1',
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

<Form {scheme} {modal_message} redirect_location="articles" />