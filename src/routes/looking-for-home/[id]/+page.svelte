<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import { showModal, closeModal, redirect } from '$lib/components/utils/func.js';
	import { _ADMIN_FLAG } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;
	export let action;

	let pig = data.pig;
	let pig_id = pig.id;
	let pic = pig.main_photo;
	let header = pig.name + ' в поисках дома';
	let age = pig.age;
	let graduated = pig.status_id;
	let text = pig.description;
	let date = pig.datetime;
	let admin = false;

	onMount(() => {
		admin = localStorage.getItem(_ADMIN_FLAG);
	})

	const show_edit = (evt) => {
		showModal(evt, 'modal_edit');
		evt.target.removeEventListener('click', show_edit);
		document.removeEventListener('click', closeModal);
	}

	const redirect_to_edit = () => {
		redirect('/admin/edit/pig/' + pig.id);
	}

</script>

<svelte:head>
	<title>{pig.name ?? 'Свинка'}</title>
</svelte:head>

<Article {date}>
	<PigProfile {text} {graduated} {pic} {header} {age} {redirect_to_edit} id={pig_id} {admin} />

	{#if pig.photos.length > 1}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>
