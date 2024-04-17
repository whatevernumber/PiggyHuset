<script>
	import {onMount} from "svelte";
    import {_REMOTE_SERVER} from "$env/static/public";
    import {check_link_external, wrap_element} from "$lib/components/utils/func.js";

	export let text;

    let window_width;

    const zoom_image = function (evt) {
        evt.target.parentNode.classList.toggle('active');
    };

	onMount(() => {
		const article = document.querySelector('.article_text');
        article.innerHTML = text;

        if (window_width > 1000) {
            const paragraphs = article.querySelectorAll('*');

            for (const p of paragraphs) {

                // пусть ссылки внутри сайта открываются в той же вкладке
                if (p.tagName === 'A') {
                    const link_external = check_link_external(p.href);

                    if (!link_external) {
                        p.removeAttribute('target');
                    }
                }

                // добавление отступа абзацам, идущим до перехода от картинки к полной ширине
                if (['P', 'BLOCKQUOTE', 'LI', 'H1', 'H2'].includes(p.tagName)) {
                    const offset = window.scrollY + p.getBoundingClientRect().top;
                    const limit = window.scrollY + article.getBoundingClientRect().top + 70;
                    if (offset < limit) {
                        p.classList.add('float-right');
                    } else {
                        break;
                    }
                }
            }
        }

        const images = article.querySelectorAll('img');

        for (let img of images) {
            if (img.src.includes('domik-article')) {
                img.src = `${_REMOTE_SERVER}/img/${img.src.slice(img.src.lastIndexOf('/') + 1)}`;
            }

            img = wrap_element(img, 'figure', 'article-figure');
            let caption = img.parentElement.parentElement.tagName === 'SPAN' ? img.parentElement.parentElement.parentElement.nextSibling : img.parentElement.parentElement.nextSibling;

            if (caption && caption.textContent) {
                caption.classList.contains('float-right') ? caption.classList.remove('float-right') : '';
                img.parentNode.appendChild(caption);
                caption = wrap_element(caption, 'figcaption', 'article-figure-caption');
                img.parentNode.classList.add('captioned');
            } else if (window_width > 1000) {
                img.addEventListener('click', zoom_image);
            }
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

    .article_text a {
        color: #D97544 !important;
        font-weight: 600;

        &:visited {
            color: #b0bd9a !important;
        }

        &:hover {
            color: #88aa4d !important;
        }

        &:active {
            font-weight: 800;
        }
    }

    .article-figure {
        margin: 0;
        padding: 15px;
        background-color: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;

        &.captioned {
            background-color: aliceblue;
        }
    }

    .article-figure.active {
        scale: 1.5;
        margin: 15% auto;
        padding: 1%;
        background-color: #e1edce;

        &.captioned {
            scale: 1.2;
            background-color: aliceblue;
        }
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
        width: 80%;
        padding-left: 10%;
        margin: 3% 0;
        text-align: justify;
    }

    .article_text ul > li,
    .article_text ol > li {
        margin-bottom: 5%;
    }

    .article_text ul > li {
        list-style: none;
        padding: 1% 10px;
        border: 1px solid #e1edce;
    }

    .article_text ul > li::before {
        content: '';
        display: flex;
        width: 35px;
        height: 35px;
        position: absolute;
        margin-left: -50px;
        background-image: url("/img/list-item.png");
        background-size: contain;
    }

	/*.article_text p strong {*/
    /*    font-weight: bold;*/
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