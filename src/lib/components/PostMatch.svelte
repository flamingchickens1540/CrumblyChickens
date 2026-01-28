<script lang="ts">
	import VerticalToggleGroup from './VerticalToggleGroup.svelte';
	import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
	import StarRating from '$lib/components/StarRating.svelte';
	import BottomButton from '$lib/components/BottomButton.svelte';

	const { match_data } = $props();
	let notes = $derived(match_data.notes);

</script>

<div class={'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1 auto-cols-fr'}>
	<VerticalToggleGroup items={['L1', 'L2', 'L3', 'Not Attempted']} />
	<StarRating />
	<HorizontalToggleGroup items={['Undamaged', 'Broken']} />
	<HorizontalToggleGroup items={['Functional', 'Died on Field']} />
	<textarea
		name="Notes"
		cols="40"
		rows="5"
		placeholder="Notes"
		bind:value={notes}
		class="m-2.5 rounded-lg border border-[#C2C2C2] p-3 text-[#C2C2C2]"
	></textarea>
</div>

<BottomButton {match_data} />