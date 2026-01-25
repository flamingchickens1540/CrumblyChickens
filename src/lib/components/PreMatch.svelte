<script lang="ts">
	import { get } from 'svelte/store';
	import { activePage, stage, count } from '$lib/state';
	import VerticalToggleGroup from './VerticalToggleGroup.svelte';
	import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';

	const flow = [
		{ stage: 'PreMatch' },
		{ stage: 'Autonomous' },
		{ stage: 'Teleoperated' },
		{ stage: 'PostMatch' }
	] as const;

	function advanceFlow() {
		const currentStage = get(stage);
		const index = flow.findIndex((f) => f.stage === currentStage);
		const next = flow[index + 1];
		if (!next) return;

		stage.set(next.stage);
		activePage.set(next.stage);
		count.set(0);
	}

	const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
	const bottomBtnClass = 'fixed bottom-0 left-3 right-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]';
</script>

<div class={gridClass}>
	<VerticalToggleGroup items={['Outpost', 'Tower', 'Depot']} />
</div>

<div class={`${gridClass} grid auto-cols-fr`}>
	<HorizontalToggleGroup items={['Fielded', 'Missed Match']} />
</div>

<button
	class="m-2.5 inline-flex items-center justify-center rounded-md
	       px-8 py-2 drop-shadow-xl
	       transition-transform duration-300 hover:scale-105 {bottomBtnClass}"
	onclick={() => advanceFlow()}
>
	<p class="font-[Poppins] text-4xl font-semibold text-white">Next Stage</p>
</button>
