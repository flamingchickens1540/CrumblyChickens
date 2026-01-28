<script lang="ts">
	import VerticalToggleGroup from './VerticalToggleGroup.svelte';
	import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
	import BottomButton from '$lib/components/BottomButton.svelte';

	const { match_data } = $props();
</script>

<div class={'grid-wrap mx-3 mt-0 mb-3 px-1 pt-0 pb-1 grid auto-cols-fr'}>
	<VerticalToggleGroup items={['Outpost', 'Tower', 'Depot']} />
	<HorizontalToggleGroup items={['Fielded', 'Missed Match']} />
</div>

<BottomButton {match_data} />
