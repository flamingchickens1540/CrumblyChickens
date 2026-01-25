<script lang="ts">
	import SoloToggleButton from './SoloToggleButton.svelte';
	import { activePage, stage, count } from '$lib/state';
	import type { GroupPage } from '$lib/types';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	const flow = [
		{ stage: 'PreMatch' },
		{ stage: 'Autonomous' },
		{ stage: 'Teleoperated' },
		{ stage: 'PostMatch' }
	] as const;

	function setActivePage(page?: GroupPage) {
		const currentStage = get(stage);

		const nextGroupPage = page ?? currentStage;

		if (!nextGroupPage) {
			goto('/home');
			return;
		}

		activePage.set(nextGroupPage);
	}

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

	const actionConfigs: Partial<
		Record<
			GroupPage,
			{
				label: string;
				classlist: string;
				onClick?: () => void;
			}[]
		>
	> = {
		Autonomous: [
			{
				label: 'Hub',
				classlist: 'bg-[#315F94] hover:bg-[#5A7FA9]',
				onClick: () => setActivePage('plusminus')
			},
			{
				label: 'Shuffle',
				classlist: 'bg-[#315F94] hover:bg-[#5A7FA9]',
				onClick: () => setActivePage('plusminus')
			}
		],
		Teleoperated: [
			{
				label: 'Hub',
				classlist: 'bg-[#6C3082] hover:bg-[#89599B]',
				onClick: () => setActivePage('plusminus')
			},
			{
				label: 'Shuffle',
				classlist: 'bg-[#6C3082] hover:bg-[#89599B]',
				onClick: () => setActivePage('plusminus')
			},
			{
				label: 'Steal',
				classlist: 'bg-[#6C3082] hover:bg-[#89599B]',
				onClick: () => setActivePage('plusminus')
			}
		]
	};
</script>

<div class={`${gridClass} grid auto-rows-[20dvh]`}>
	{#each actionConfigs[$activePage] ?? [] as action}
		<button
			class="m-2.5 inline-flex items-center justify-center rounded-md
				px-8 py-2 drop-shadow-xl
				transition-transform duration-300 hover:scale-105 {`m-0 ${action.classlist}`}"
			onclick={action.onClick}
		>
			<p class="font-[Poppins] text-4xl font-semibold text-white">{action.label}</p>
		</button>
	{/each}
</div>

<button
	class="m-2.5 inline-flex items-center justify-center rounded-md
				px-8 py-2 drop-shadow-xl
				transition-transform duration-300 hover:scale-105 {bottomBtnClass}"
	onclick={() => advanceFlow()}
>
	<p class="font-[Poppins] text-4xl font-semibold text-white">Next Stage</p>
</button>
{#if $activePage === 'Autonomous'}
	<div class={`${gridClass} grid auto-cols-fr`}>
		<SoloToggleButton label="Auto Climb" />
	</div>
{/if}
