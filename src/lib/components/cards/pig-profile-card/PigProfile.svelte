<script>
	import CardPhoto from '$lib/components/cards/CardPhoto.svelte';
	import CardDescription from '$lib/components/cards/CardDescription.svelte';


	export let header = 'Свинка в поисках дома';
	export let description = 'Тем чьи сердца не остыли от холода. Вселенная дарит чудо!\n' +
				'В жизни маленького Финика последние дни творятся сплошные чудеса! ' +
				'Финика уже очень ждут в новом доме! И мы очень надеемся, что у Рыжего солнышка появятся новые друзья. Следите за новостями!)';
	export let graduated = false;
	export let profile_pic
	export let age;

	export let article = false;
	export let admin;
</script>

<div class='profile_wrapper'>
	<CardPhoto {profile_pic} {admin} }/>
	<CardDescription {header} {description} {graduated} {article} {age} />
</div>

<style>
	.profile_wrapper {
		display: flex;
		column-gap: 29px;
	}
</style>