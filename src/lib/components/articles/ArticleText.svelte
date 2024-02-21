<script>
	import {onMount} from "svelte";
    import {_REMOTE_SERVER} from "$env/static/public";
    import {wrap_element} from "$lib/components/utils/func.js";

	export let text;

    let window_width;

	onMount(() => {
		const article = document.querySelector('.article_text');
        article.innerHTML = text;

        if (window_width > 1000) {
            const paragraphs = article.querySelectorAll('*');
            paragraphs.forEach((p) => {
                if (['P', 'BLOCKQUOTE', 'LI'].includes(p.tagName)) {
                    const offset = window.scrollY + p.getBoundingClientRect().top;
                    const limit = window.scrollY + article.getBoundingClientRect().top + 150;
                    if (offset < limit) {
                        p.classList.add('float-right');
                    }
                }
            });
        }

        const images = article.querySelectorAll('img');

        for (let img of images) {
            if (img.src.includes('domik-article')) {
                img.src = `${_REMOTE_SERVER}/img/${img.src.slice(img.src.lastIndexOf('/') + 1)}`;
            }

            img = wrap_element(img, 'figure', 'article-figure');

            let caption = img.parentElement.parentElement.nextSibling;

            caption.classList.remove('float-right');
            img.parentNode.appendChild(caption);
            caption = wrap_element(caption, 'figcaption', 'article-figure-caption');
        }
	})
</script>

<svelte:window bind:innerWidth={window_width} />

<div class="article_text">
    <slot />
</div>

<style global>
	.article_text {
        display: grid;
      	font-size: 16px;
      	font-style: normal;
      	font-weight: 400;
      	line-height: 150%;
		word-wrap: anywhere;
        white-space: pre-wrap;
		text-align: justify;

        & img {
            max-width: 100%;
            margin: 0;
        }

        & blockquote {
            display: inline-block;
            font-style: italic;
        }

        & blockquote a {
            color: #D97544;
        }
	}

    .article_text .float-right {
        margin-left: 225px;
    }

    .article_text p:empty, .article_text br {
        display: none;
    }

    .article_text p {
        margin: 0.35em 0;

        &:has(figure) {
            max-width: 85%;
            place-self: center;
        }
    }

    .article-figure {
        margin: 0;
        padding: 15px;
        background-color: aliceblue;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .article-figure-caption {
        margin-top: 3%;
        text-align: justify;
        color: #D97544;

        & p {
            margin: 0;
        }
    }

	.article_text h2, .article_text h3 {
        display: inline-block;
        margin: 3% 0;
	}

    .article_text h2 {
        color: #88aa4d;
    }

	.article_text p a {
		color: #D97544;
	}

    .article_text ul,
    .article_text ol {
        padding-left: 5%;
        margin: 3% 0;
        text-align: justify;
    }

	/*.article_text p strong {*/
	/*	text-shadow: 1px 1px #88aa4d, -1px -1px #f6b5d3;*/
	/*}*/

	@media (max-width: 1000px) {
		.article_text {
            text-align: justify;
		}

        .article-figure-caption {
            margin-top: 6%;
        }
	}
</style>