<script lang="ts">
	import FuelCounter from './FuelCounter.svelte';
	import PlusMinusButton from './PlusMinusButton.svelte';
	import BottomButton from './BottomButton.svelte';

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
	let label = 'Back';
</script>

<FuelCounter label="Fuel" {stage} {count} />
<div class="grid-wrap mx-3 mt-0 mb-3 grid grid-cols-2 grid-rows-[45dvh_1fr] px-1 pt-0 pb-1">
	<PlusMinusButton value={+1} bind:count classlist="bg-[#49A078] hover:bg-[#6DB393]" />
	<PlusMinusButton value={+5} bind:count classlist="bg-[#49A078] hover:bg-[#6DB393]" />
	<PlusMinusButton value={-1} bind:count classlist="col-span-2 bg-[#FF6663] hover:bg-[#FF8582]" />
</div>
<BottomButton {activePage} {count} {stage} {notes} {label} {goToPage} {setStage} />
