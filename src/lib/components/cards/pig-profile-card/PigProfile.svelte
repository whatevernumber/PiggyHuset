<script>
	import ProfilePhoto from '$lib/components/cards/pig-profile-card/ProfilePhoto.svelte';
	import CardMainContent from '$lib/components/cards/CardMainContent.svelte';

	export let pig;
    export let type;
	export let article;
	export let admin;
	export let show_delete;
	export let redirect_to_edit;
	export let removable;
	export let status;
	export let modal_opened;
	export let status_value;
	export let pig_status;
	export let pig_status_id;
	export let action;
</script>

<div class="profile_wrapper">
	<ProfilePhoto {type} pic={pig.main_photo} {status} {admin} {show_delete} {redirect_to_edit} {removable}/>
	<CardMainContent {pig}
		{pig_status} {pig_status_id} {article} {admin}
					 bind:modal_opened={modal_opened} bind:status_value={status_value}
					 bind:action={action} />
</div>

<style>
    .profile_wrapper {
        display: flex;
    }

	@media (min-width: 1001px) {
        .profile_wrapper {
			column-gap: 15px;
        }
    }

	@media (max-width: 1000px) {
        .profile_wrapper {
			margin-top: 20px;
            flex-direction: column;
        }
	}
</style>