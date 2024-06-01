import adapter from '@sveltejs/adapter-auto';
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
				// 'img-src': ['self', 'backend domain'],
				'script-src': ['self']
			}
		},
		env: {
			publicPrefix: '_'
		}
	}
};

export default config;
