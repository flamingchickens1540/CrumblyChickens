<script lang="ts">
	import FuelCounter from './FuelCounter.svelte';
	import PlusMinusButton from './PlusMinusButton.svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { activePage, stage, count } from '$lib/state';
	import type { GroupPage } from '$lib/types';

	function setActivePage(page?: GroupPage) {
		const currentStage = get(stage);

		const nextGroupPage = page ?? currentStage;

		if (!nextGroupPage) {
			goto('/home');
			return;
		}

		activePage.set(nextGroupPage);
	}
</script>

<FuelCounter label="Fuel" stage={$stage} count={$count} />
<div class="grid-wrap mx-3 mt-0 mb-3 grid grid-cols-2 grid-rows-[45dvh_1fr] px-1 pt-0 pb-1">
	<PlusMinusButton value={+1} bind:count={$count} classlist="bg-[#49A078] hover:bg-[#6DB393]" />
	<PlusMinusButton value={+5} bind:count={$count} classlist="bg-[#49A078] hover:bg-[#6DB393]" />
	<PlusMinusButton
		value={-1}
		bind:count={$count}
		classlist="col-span-2 bg-[#FF6663] hover:bg-[#FF8582]"
	/>
</div>
<button
	class="fixed right-3 bottom-0 left-3 m-2.5
	       inline-flex items-center justify-center
	       rounded-md bg-[#5C5C5C] p-2 px-8 py-2 drop-shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-[#7D7D7D]"
	onclick={() => setActivePage()}
>
	<p class="font-[Poppins] text-4xl font-semibold text-white">Back</p>
</button>
