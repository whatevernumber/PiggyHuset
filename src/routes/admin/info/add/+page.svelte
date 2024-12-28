<script>
	import NewInfoForm from '$lib/components/forms/NewInfoForm.svelte';
	import ReturnButton from '$lib/components/misc/button/ReturnButton.svelte';

	export let data;
</script>

<svelte:head>
	<title>Добавить новую карточку</title>
</svelte:head>

<NewInfoForm options="{data.selectOptions}"/>
<ReturnButton />