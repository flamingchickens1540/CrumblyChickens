<script lang="ts">
	import SoloToggleButton from './SoloToggleButton.svelte';
	import BottomButton from '$lib/components/BottomButton.svelte';
	const {
		activePage: ActivePage,
		stage: _Stage,
		count: Count,
		notes: Notes,
		setStage,
		goToPage } = $props();

	let stage = $derived(_Stage);
	let count = $derived(Count);
	let notes = $derived(Notes);
	let activePage = $derived(ActivePage);

	const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';

	const actionConfigs: Partial<
		Record<
			typeof activePage,
			{
				label: string;
				classlist: string;
			}[]
		>
	> = {
		Autonomous: [
			{ label: 'Hub', classlist: 'bg-[#315F94] hover:bg-[#5A7FA9]' },
			{ label: 'Shuffle', classlist: 'bg-[#315F94] hover:bg-[#5A7FA9]' }
		],
		Teleoperated: [
			{ label: 'Hub', classlist: 'bg-[#6C3082] hover:bg-[#89599B]' },
			{ label: 'Shuffle', classlist: 'bg-[#6C3082] hover:bg-[#89599B]' },
			{ label: 'Steal', classlist: 'bg-[#6C3082] hover:bg-[#89599B]' }
		]
	};
</script>

<div class={`${gridClass} grid auto-rows-[20dvh]`}>
	{#each (actionConfigs[activePage as keyof typeof actionConfigs] ?? []) as action}
		<button
			class="m-2.5 inline-flex items-center justify-center
			rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300
			hover:scale-105 {action.classlist}"
			onclick={() => goToPage('PlusMinus')}
		>
			<p class="font-[Poppins] text-4xl font-semibold text-white">{action.label}</p>
		</button>
	{/each}
</div>

<BottomButton label="Next Stage"
	activePage={activePage}
	stage={stage}
	count={count}
	notes={notes}
	goToPage={goToPage}
	setStage={setStage} />

{#if activePage === 'Autonomous'}
	<div class={`${gridClass} grid auto-cols-fr`}>
		<SoloToggleButton label="Auto Climb" />
	</div>
{/if}
