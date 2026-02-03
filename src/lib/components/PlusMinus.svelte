<script lang="ts">
	import FuelCounter from './FuelCounter.svelte';
	import PlusMinusButton from './PlusMinusButton.svelte';
	import BottomButton from './BottomButton.svelte';

	let { match_data, plusMinus, activeKey } = $props();
	let stage = $derived(match_data.stage)
	let count = $state(0);

	$effect(() => {
		if (activeKey) {
			count = match_data[activeKey] ?? 0;
		}
	});

	$effect(() => {
		if (activeKey) {
			match_data[activeKey] = count;
		}
	});
</script>

<FuelCounter label="Fuel" {stage} {count} />
<div class="grid-wrap mx-3 mt-0 mb-3 grid grid-cols-2 grid-rows-[45dvh_1fr] px-1 pt-0 pb-1">
	<PlusMinusButton value={+1} bind:count classlist="bg-[#49A078] hover:bg-[#6DB393]" />
	<PlusMinusButton value={+5} bind:count classlist="bg-[#49A078] hover:bg-[#6DB393]" />
	<PlusMinusButton value={-1} bind:count classlist="col-span-2 bg-[#FF6663] hover:bg-[#FF8582]" />
</div>
<BottomButton {match_data} {plusMinus} />