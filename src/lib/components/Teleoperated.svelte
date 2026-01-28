<script lang="ts">
	import BottomButton from './BottomButton.svelte';
	import PlusMinus from './PlusMinus.svelte';
	
	let { match_data, plusMinus = $bindable() } = $props();
</script>

{#if plusMinus}
	<PlusMinus {match_data} {plusMinus} />
{/if}

{#if !plusMinus}
	<div class={`auto-rows-[25dvh] grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1`}>
		<button
			class="m-2.5 inline-flex items-center justify-center
			rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300
			hover:scale-105 bg-[#6C3082]"
			onclick={() => {
				match_data.activeKey = 'hub';
				plusMinus = true;
			}}
		>
			<p class="font-[Poppins] text-4xl font-semibold text-white">Hub</p>
		</button>

		<button
			class="m-2.5 inline-flex items-center justify-center
			rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300
			hover:scale-105 bg-[#6C3082]"
			onclick={() => {
				match_data.activeKey = 'shuffle';
				plusMinus = true;
			}}
		>
			<p class="font-[Poppins] text-4xl font-semibold text-white">Shuffle</p>
		</button>

		<button
			class="m-2.5 inline-flex items-center justify-center
			rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300
			hover:scale-105 bg-[#6C3082]"
			onclick={() => {
				match_data.activeKey = 'steal';
				plusMinus = true;
			}}
		>
			<p class="font-[Poppins] text-4xl font-semibold text-white">Steal</p>
		</button>
	</div>
{/if}

<BottomButton {match_data} bind:plusMinus />
