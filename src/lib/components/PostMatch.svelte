<script lang="ts">
	import VerticalToggleGroup from './VerticalToggleGroup.svelte';
	import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
	import StarRating from '$lib/components/StarRating.svelte';
	import { stage, count, notes } from '$lib/state';
	import { goto } from '$app/navigation';

	function resetFlow() {
		stage.set('PreMatch');
		count.set(0);
		notes.set('');
		goto('home');
	}

	const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
	const bottomBtnClass = 'fixed bottom-0 left-3 right-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]';
</script>

<div class={gridClass}>
	<VerticalToggleGroup items={['L1', 'L2', 'L3', 'Not Attempted']} />
</div>

<div class={`${gridClass} grid auto-cols-fr`}>
	<StarRating />
</div>

<div class={`${gridClass} grid auto-cols-fr`}>
	<HorizontalToggleGroup items={['Undamaged', 'Broken']} />
</div>

<div class={`${gridClass} grid auto-cols-fr`}>
	<HorizontalToggleGroup items={['Functional', 'Died on Field']} />
</div>

<button
	class="m-2.5 inline-flex items-center justify-center rounded-md
				px-8 py-2 drop-shadow-xl
				transition-transform duration-300 hover:scale-105 {bottomBtnClass}"
	onclick={() => resetFlow()}
>
	<p class="font-[Poppins] text-4xl font-semibold text-white">Submit</p>
</button>

<div class={`${gridClass} grid auto-cols-fr`}>
	<textarea
		name="Notes"
		cols="40"
		rows="5"
		placeholder="Notes"
		bind:value={$notes}
		class="m-2.5 rounded-lg border border-[#C2C2C2] p-3 text-[#C2C2C2]"
	></textarea>
</div>
