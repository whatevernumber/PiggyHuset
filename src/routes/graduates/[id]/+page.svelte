<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import { redirect } from '$lib/components/utils/func.js';
	import { _ADMIN_FLAG } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;

	const type = 'ready';
	const pig = data.pig;
	const pic = pig.main_photo;
	const age = pig.age;
	const graduated = pig.status_id;
	const taken = pig.taken;
	const rainbow = pig.rainbow;
	const text = pig.description;
	const date = pig.datetime;
	let city = pig.city.city_name;
	let overseer = pig.overseer ? pig.overseer.overseer_name : null;
	let pig_sex = pig.sex;

	let header = pig.name;
	let status; // для отображения картинки статуса выпусника;

	switch (graduated) {
		case 2:
			header += ' в новом доме';
			break;
		case 3:
			header += '  на радуге';
			status = 'rainbow';
			break;
		case 4:
			header += ' — зажаблено!';
			status = 'taken';
			break;

		default :
			header;
	}

	let action;
	let admin = false;

	onMount(() => {
		admin = localStorage.getItem(_ADMIN_FLAG);
	})

	const redirect_to_edit = () => {
		redirect('/admin/edit/pig/' + pig.id);
	}

</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<Article {date} {text} photos="{pig.photos}" type="graduate">
	<PigProfile {city} {overseer} {graduated} {pig_sex} {status} {taken} {rainbow} {pic} {header} {age} {type} {redirect_to_edit} {admin} />
</Article>
