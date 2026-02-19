<script lang="ts">
	import SoloToggleButton from './SoloToggleButton.svelte';
	import BottomButton from './BottomButton.svelte';
	import PlusMinus from './PlusMinus.svelte';

	let { match_data } = $props();
	let plusMinus: boolean = $state(false);
	let activeKey: string | null = $state(null);
</script>

{#if plusMinus}
	<PlusMinus {match_data} {plusMinus} {activeKey} />
{:else}
	<div class="grid-wrap mx-3 mt-0 mb-3 grid auto-rows-[35dvh] px-1 pt-0 pb-1">
		<button
			class="m-2.5 inline-flex items-center justify-center
			rounded-md bg-[#315F94] px-8 py-2 drop-shadow-xl transition-transform
			duration-300 hover:scale-105"
			onclick={() => {
				activeKey = 'autoHub';
				plusMinus = true;
			}}
		>
			<p class="font-[Poppins] text-4xl font-semibold text-white">Hub</p>
		</button>
		<button
			class="m-2.5 inline-flex items-center justify-center
			rounded-md bg-[#315F94] px-8 py-2 drop-shadow-xl transition-transform
			duration-300 hover:scale-105"
			onclick={() => {
				activeKey = 'autoShuffle';
				plusMinus = true;
			}}
		>
			<p class="font-[Poppins] text-4xl font-semibold text-white">Shuffle</p>
		</button>
	</div>

	<div class="grid-wrap mx-3 mt-0 mb-3 grid auto-cols-fr px-1 pt-0 pb-1">
		<SoloToggleButton label="Auto Climb" />
	</div>
{/if}

<!-- BottomButton is rendered so it can toggle plusMinus (omfg svelte is evil ughhhhhh) -->
<BottomButton {match_data} bind:plusMinus />
