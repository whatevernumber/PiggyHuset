<script>
    import Form from "$lib/components/forms/Form.svelte";
    import TextEditorInstructions from "$lib/components/misc/form-elements/TextEditorInstructions.svelte";

	export let article;
    export let title;
	export let method;
	export let endpoint = 'articles/add';
	export let old_photos;
	export let is_editing;

	let modal_message = 'Запись опубликована';

    const scheme = {
        title: title,
        endpoint: endpoint,
        fields: [
            {
                label: 'Заголовок статьи',
                name: 'title',
                required: true
            },
            {
                label: 'Автор статьи',
                name: 'author',
            },
            {
                label: 'Текст статьи',
                name: 'text',
                type: 'wysiwyg',
                required: true
            },
            {
                label: 'Источник',
                name: 'origin_link',
            },
			{
				label: 'Теги',
				name: 'hashtags',
				placeholder: 'Укажите теги через пробел',
			},
			{
				label: 'Meta-title',
				name: 'meta_title',
			},
			{
				label: 'Meta-desc',
				name: 'meta_description',
			},
        ],
        files: {
            file_input: true,
			multiple: false,
        }
    };
</script>

<Form {scheme} {modal_message} {method} {is_editing} {old_photos} {article} redirect_location="articles" />
<TextEditorInstructions />