<script>
	import ProfilePhoto from '$lib/components/cards/pig-profile-card/ProfilePhoto.svelte';
	import CardMainContent from '$lib/components/cards/CardMainContent.svelte';

	export let header;
	export let text;
	export let graduated;
	export let taken;
	export let rainbow;
	export let pic;
	export let id;
	export let age;
    export let type;
	export let article;
	export let volunteer;
	export let admin;
	export let show_delete;
	export let redirect_to_edit;
	export let removable;
	export let status;
</script>

<div class='profile_wrapper'>
	<ProfilePhoto {type} {pic} {status} {admin} {show_delete} {redirect_to_edit} {removable}/>
	<CardMainContent {header} {text} {graduated} {taken} {rainbow} {article} {age} {volunteer} {id} {admin}/>
</div>

<style>
    .profile_wrapper {
        display: flex;
    }

	@media (min-width: 1001px) {
        .profile_wrapper {
			column-gap: 29px;
        }
    }

	@media (max-width: 1000px) {
        .profile_wrapper {
			margin-top: 20px;
            flex-direction: column;
        }
	}
</style>