import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

const mode = process.env.DEVELOPMENT_MODE == 'dev';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		paths: {
			// set base url, or github page will load asset from .io/ not .io/portfolio
			// base: mode ? '/' : '/portfolio',
		},
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter({
			pages: 'output/build',
			assets: 'output/build',
			fallback: null
		}),
		target: '#svelte'
		// adapter: adapter()
	}
};

export default config;
