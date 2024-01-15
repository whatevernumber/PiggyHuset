<script>
    import Form from "$lib/components/forms/Form.svelte";

    const scheme = {
        title: title || 'Новая статья',
        endpoint: '/articles',
        fields: [
            {
                label: 'Автор',
                name: 'author'
            },
            {
                label: 'Источник (ссылка)',
                name: 'origin_link'
            },
            {
                label: 'Текст статьи',
                name: 'text',
                type: 'textarea',
                required: true
            }
        ],
        files: {
            file_input: true,
            multiple: true
        }
    }
</script>

<Form {scheme} />