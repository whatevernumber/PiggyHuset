<script>
	import ProfilePhoto from '$lib/components/cards/pig-profile-card/ProfilePhoto.svelte';
	import CardMainContent from '$lib/components/cards/CardMainContent.svelte';

	export let pig_name;
	export let graduated;
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
	export let modal_opened;
	export let status_value;
	export let overseer;
	export let city;
	export let pig_sex;
	export let graduation_date;
	export let pig_status;
	export let pig_status_id;
	export let action;
</script>

<div class="profile_wrapper">
	<ProfilePhoto {type} {pic} {status} {admin} {show_delete} {redirect_to_edit} {removable}/>
	<CardMainContent {pig_status} {pig_status_id}
					 {pig_name} {graduation_date} {pig_sex} {city} {overseer} {graduated} {article} {age}
					 {volunteer} {id} {admin}
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