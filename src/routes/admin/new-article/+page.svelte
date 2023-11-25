<script>
	import Article from '$lib/components/articles/Article.svelte';
	import BigHeader from '$lib/components/misc/h-headers/BigHeader.svelte';
	import TextArea from '$lib/components/misc/form-elements/TextArea.svelte';
	import FileInput from '$lib/components/misc/form-elements/FileInput.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import SubmitButton from '$lib/components/misc/form-elements/SubmitButton.svelte';
	import TextInput from '$lib/components/misc/form-elements/TextInput.svelte';
</script>

<div class="article_wrapper">
	<Article class_name="article_post" >
		<BigHeader textContent = "Новая статья"/>
		<form method="post" enctype="multipart/form-data">
			<div class="form-wrapper">
				<TextInput name="author" class_name="text_input" header="Автор" placeholder="Автор статьи" />
				<TextInput name="link" class_name="text_input" header="Ссылка на оригинальную статью" placeholder="Ссылка на оригинал статьи (если есть)" />
				<TextArea />
				<div class="photo-area">
					<FileInput />
					{#if true}
						<div class="photo-uploaded">
							<p class="uploaded-text">Загруженные фото: </p>
							<PhotoCard width="93" height="71" />
							<PhotoCard width="93" height="71" />
							<PhotoCard width="93" height="71" />
							<PhotoCard width="93" height="71" />
							<PhotoCard width="93" height="71" />
							<PhotoCard width="93" height="71" />
						</div>
					{/if}
				</div>
				<SubmitButton />
			</div>
		</form>
	</Article>
</div>


<style>
    .article_wrapper {
        max-width: 1089px;
        margin: 54px auto;
        position: relative;
    }

    .form-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 15px;
    }

    .photo-area {
        width: 800px;
        display: flex;
        column-gap: 30px;
        align-items: center;
    }

    .photo-uploaded {
        max-width: 600px;
        text-align: center;
        margin-left: auto;
    }

    .uploaded-text {
        margin-bottom: 10px;
    }
</style>