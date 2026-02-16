<script lang="ts">
	import VerticalToggleGroup from './VerticalToggleGroup.svelte';
	import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
	import BottomButton from '$lib/components/BottomButton.svelte';

	const { match_data = $bindable() } = $props();
</script>

<div class={'grid-wrap mx-3 mt-0 mb-3 grid auto-cols-fr px-1 pt-0 pb-1'}>
	<VerticalToggleGroup items={['Outpost', 'Tower', 'Depot']} />
	<HorizontalToggleGroup items={['Fielded', 'Missed Match']} />
</div>

<BottomButton bind:match_data />
