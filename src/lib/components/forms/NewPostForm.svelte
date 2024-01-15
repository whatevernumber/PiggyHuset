<script>
    import Form from "$lib/components/forms/Form.svelte";

    export let title;

    const scheme = {
        title: title || 'Новая публикация',
        endpoint: '/articles/type/2',
        fields: [
            {
                label: 'Заголовок публикации',
                name: 'title'
            },
            {
                label: 'Текст публикации',
                name: 'text',
                type: 'textarea',
                required: true,
                placeholder: 'Расскажите новость'
            }
        ],
        files: {
            file_input: true,
            multiple: true
        }
    }
</script>

<Form {scheme} />