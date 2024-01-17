<script>
    import Form from "$lib/components/forms/Form.svelte";

    export let title;

    const scheme = {
        title: title || 'Новая публикация',
        endpoint: '/articles/type/2',
        fields: [
            {
                label: 'Заголовок публикации',
                name: 'title',
                required: true
            },
            {
                label: 'Текст публикации',
                name: 'text',
                type: 'textarea',
                required: true,
                placeholder: 'Расскажите новость',
                emoji: true
            }
        ],
        files: {
            file_input: true,
            multiple: true
        }
    }
</script>

<Form {scheme} redirect_location="articles" />