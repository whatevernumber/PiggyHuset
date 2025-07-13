import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({

	}),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		// Protection from XSS
		csp: {
			mode: 'auto',
			directives: {
				'base-uri': ['self'],
				'img-src': [
					'self',
					'blob: self',
					'https://*.domik-svinok.ru/api/',
					'https://mc.yandex.ru',
					'https://*.userapi.com',
					'https://*.vkuserphoto.ru',
					'https://*.tile.openstreetmap.fr',
					'data: https://*.tile.openstreetmap.fr'
				],
				'script-src': [
					'strict-dynamic',
					'unsafe-eval',
					'http://vk.com',
					'https://vk.com',
					'https://login.vk.com/',
				],
				'connect-src': [
					'self',
					'https://mc.yandex.ru',
					'https://domik-svinok.ru/api/',
					'https://cdn.jsdelivr.net/npm/',
					'self',
				],
				'child-src': [
					'blob: https://mc.yandex.ru',
				],
				'frame-src': [
					'blob: https://mc.yandex.ru/',
					'blob: https://mc.yandex.md/',
					'blob: https://vk.com/',
					'blob: https://login.vk.com/',
				]
			}
		},
		env: {
			publicPrefix: '_'
		},
	}
};

export default config;
