<script lang="ts">
	import VerticalToggleGroup from './VerticalToggleGroup.svelte';
	import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
	import StarRating from '$lib/components/StarRating.svelte';
	import BottomButton from '$lib/components/BottomButton.svelte';

	const { container } = $props();
	let notes = $derived(container.notes);

	const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
</script>

<div class={`${gridClass} grid auto-cols-fr`}>
	<VerticalToggleGroup items={['L1', 'L2', 'L3', 'Not Attempted']} />
	<StarRating />
	<HorizontalToggleGroup items={['Undamaged', 'Broken']} />
	<HorizontalToggleGroup items={['Functional', 'Died on Field']} />
</div>

<BottomButton label="Submit" {container} />

<div class={`${gridClass} grid auto-cols-fr`}>
	<textarea
		name="Notes"
		cols="40"
		rows="5"
		placeholder="Notes"
		bind:value={notes}
		class="m-2.5 rounded-lg border border-[#C2C2C2] p-3 text-[#C2C2C2]"
	></textarea>
</div>