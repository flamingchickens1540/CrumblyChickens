<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let orientation = 'horizontal'; // 'horizontal' | 'vertical'
	export let items: string[] = [];

	const selected = writable(null);

	setContext('toggle-group', {
		selected,
		orientation,
		isFirst: (v: string) => items[0] === v,
		isLast: (v: string) => items[items.length - 1] === v
	});
</script>

<div class="flex mx-2.5 mt-3"
class:flex-col={orientation === 'vertical'}
class:flex-row={orientation === 'horizontal'}>
	<slot />
</div>