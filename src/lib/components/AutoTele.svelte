<script lang="ts">
	import SoloToggleButton from './SoloToggleButton.svelte';
	import BottomButton from '$lib/components/BottomButton.svelte';
	
	const { container } = $props();

	let activePage = $derived(container.activePage);
	let goToPage = $derived(container.goToPage);

	let gridClass = $state('');

	$effect(() => {
		gridClass =
			activePage === 'Autonomous'
				? 'auto-rows-[35dvh]'
				: 'auto-rows-[25dvh]';
	});

	const actionConfigs = {
		Autonomous: [
			{ label: 'Hub', key: 'autoHub', classlist: 'bg-[#315F94]' },
			{ label: 'Shuffle', key: 'autoShuffle', classlist: 'bg-[#315F94]' }
		],
		Teleoperated: [
			{ label: 'Hub', key: 'hub', classlist: 'bg-[#6C3082]' },
			{ label: 'Shuffle', key: 'shuffle', classlist: 'bg-[#6C3082]' },
			{ label: 'Steal', key: 'steal', classlist: 'bg-[#6C3082]' }
		]
	};
</script>

<div class={`${gridClass} grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1`}>
	{#each (actionConfigs[activePage as keyof typeof actionConfigs] ?? []) as action}
		<button
			class="m-2.5 inline-flex items-center justify-center
			rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300
			hover:scale-105 {action.classlist}"
			onclick={() => {
				container.activeKey = action.key;
				goToPage('PlusMinus');
			}}
		>
			<p class="font-[Poppins] text-4xl font-semibold text-white">{action.label}</p>
		</button>
	{/each}
</div>

<BottomButton label="Next Stage" {container}></BottomButton>

{#if activePage === 'Autonomous'}
	<div class={`grid-wrap mx-3 mt-0 mb-3 px-1 pt-0 pb-1 grid auto-cols-fr`}>
		<SoloToggleButton label="Auto Climb" />
	</div>
{/if}
