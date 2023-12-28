<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
</script>

<Article>
	<PigProfile profile_pic="found-home.jpg" header="Нашел дом" graduated description="Финик-Свиник уехал в Мурманск и нашёл там 'Тёплый дом' и много-много друзей" />
	<PhotoList quantity="6" />
</Article>
