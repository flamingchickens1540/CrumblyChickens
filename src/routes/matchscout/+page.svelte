<script lang="ts">
	import PreMatch from '$lib/components/PreMatch.svelte';
	import PostMatch from '$lib/components/PostMatch.svelte';
	import Teleoperated from '$lib/components/Teleoperated.svelte';
	import Autonomous from '$lib/components/Autonomous.svelte';

	const match_data = $state({
		stage: 'PreMatch',

		notes: '',
		hub: 0,
		shuffle: 0,
		steal: 0,
		autoHub: 0,
		autoShuffle: 0,

		setStage(newStage: string) {
			this.stage = newStage;
		}
	});
</script>

<center>
	<p class="m-4 mb-0 font-[Poppins] text-6xl font-bold text-[#FF4848]">1540</p>
	<p class="font-[Poppins] text-3xl text-[#C2C2C2]">
		{match_data.stage}
	</p>
</center>

{#if match_data.stage === 'PreMatch'}
	<PreMatch {match_data} />
{/if}

{#if match_data.stage === 'Autonomous'}
	<Autonomous {match_data} />
{/if}

{#if match_data.stage === 'Teleoperated'}
	<Teleoperated {match_data} />
{/if}

{#if match_data.stage === 'PostMatch'}
	<PostMatch {match_data} />
{/if}

<style>
	:global(body) {
		background-color: #2c2c2c;
	}
</style>
