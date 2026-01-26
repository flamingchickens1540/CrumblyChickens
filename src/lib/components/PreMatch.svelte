<script lang="ts">
	import VerticalToggleGroup from './VerticalToggleGroup.svelte';
	import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
	import BottomButton from '$lib/components/BottomButton.svelte';
	const {
		activePage: ActivePage,
		stage: _Stage,
		count: Count,
		notes: Notes,
		setStage,
		goToPage
	} = $props();

	let stage = $derived(_Stage);
	let count = $derived(Count);
	let notes = $derived(Notes);
	let activePage = $derived(ActivePage);

	const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
</script>

<div class={gridClass}>
	<VerticalToggleGroup items={['Outpost', 'Tower', 'Depot']} />
</div>

<div class={`${gridClass} grid auto-cols-fr`}>
	<HorizontalToggleGroup items={['Fielded', 'Missed Match']} />
</div>

<BottomButton label="Next Stage" {activePage} {stage} {count} {notes} {goToPage} {setStage} />
