<script>
	import { onMount } from 'svelte';
	import NewInfoForm from '$lib/components/forms/NewInfoForm.svelte';

	export let data;

	let product = data.article;

	let method = 'PATCH';
	let endpoint = 'info/edit?id=' + product.id;

	onMount(() =>
	{
		const form = document.querySelector('form');
		const fields = form.getElementsByClassName('form-input-field');

		for (const field of fields) {
			if (field.tagName === 'SELECT') {
				setTimeout(() => {
					field.value = product[field.name];
				}, 2450);
			} else if (field.type !== 'file') {
				field.value = product[field.name] ?? (product.info[field.name] ?? '');
			}
		}

		// if product is marked as banned
		if (product.is_banned) {
			form.querySelector('input[type=checkbox]').checked = true;
		}
	});

	const title = "Редактировать карточку " + product.title;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<NewInfoForm {method} {endpoint} {product} {title} />
