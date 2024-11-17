<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Toast, Modal, initializeStores } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
</script>

<Modal />
<Toast/>
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex flex-row items-center">
					<img class="w-1/6 min-w-10 invert" alt="CocktailApp Logo" src="logo_small.png"/>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/LenMPorath/CocktailApp-Frontend"
					target="_blank"
					rel="noreferrer"
				>
					Impressum
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/LenMPorath/CocktailApp-Frontend"
					target="_blank"
					rel="noreferrer"
				>
					Datenschutzerkärung
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/LenMPorath/CocktailApp-Frontend"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
