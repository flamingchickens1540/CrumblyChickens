<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import Display from '$lib/components/Display.svelte';
	import FuelCounter from '$lib/components/FuelCounter.svelte';
	import ToggleButton from '$lib/components/ToggleButton.svelte';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import StarRating from '$lib/components/StarRating.svelte';
	import Login from '$lib/components/Login.svelte';
	import { get } from 'svelte/store';
	import { activePage, stage, count, notes, name } from '$lib/state';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!get(activePage)) {
			activePage.set('home');
		}
	});

	type GroupPage =
		| 'home'
		| 'login'
		| 'queue'
		| 'pitscout'
		| 'analysis'
		| 'leaderboard'
		| 'plusminus'
		| 'prematch'
		| 'auto'
		| 'tele'
		| 'postmatch';
	type Stage = 'Pre-Match' | 'Autonomous' | 'Teleoperated' | 'Post-Match';

	const flow = [
		{ stage: 'Pre-Match', page: 'prematch' },
		{ stage: 'Autonomous', page: 'auto' },
		{ stage: 'Teleoperated', page: 'tele' },
		{ stage: 'Post-Match', page: 'postmatch' }
	] as const;

	const backPageByStage: Partial<Record<Stage, GroupPage>> = {
		'Pre-Match': 'prematch',
		Autonomous: 'auto',
		Teleoperated: 'tele',
		'Post-Match': 'postmatch'
	};

	function advanceFlow() {
		const currentStage = get(stage);
		const index = flow.findIndex((f) => f.stage === currentStage);
		const next = flow[index + 1];
		if (!next) return;

		stage.set(next.stage);
		activePage.set(next.page);
	}

	function setActivePage(page?: GroupPage) {
		const currentStage = get(stage);
		const nextPage = page ?? backPageByStage[currentStage] ?? 'home';
		activePage.set(nextPage);
	}

	function resetFlow() {
		stage.set('Pre-Match');
		count.set(0);
		notes.set('');
		setActivePage('home');
	}

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
		auto: [
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
		tele: [
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
		],
		home: [
			{
				label: 'Match Scout',
				classlist: 'bg-[#5C5C5C] hover:bg-[#7D7D7D]',
				onClick: () => setActivePage('queue')
			},
			{
				label: 'Pit Scout',
				classlist: 'bg-[#5C5C5C] hover:bg-[#7D7D7D]',
				onClick: () => setActivePage('pitscout')
			},
			{
				label: 'Analysis',
				classlist: 'bg-[#5C5C5C] hover:bg-[#7D7D7D]',
				onClick: () => setActivePage('analysis')
			},
			{
				label: 'Leaderboard',
				classlist: 'bg-[#5C5C5C] hover:bg-[#7D7D7D]',
				onClick: () => setActivePage('leaderboard')
			}
		]
	};

	const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
	const bottomBtnClass = 'fixed bottom-0 left-3 right-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]';
</script>

<!-- Reusable Grid Wrapper -->
{#if $activePage && ['prematch', 'auto', 'tele', 'postmatch', 'plusminus'].includes($activePage)}
	<Display currentStage={$stage} />
{/if}

{#if $activePage === 'login'}
	<Login />
{/if}

<!-- PLUSMINUS PAGE -->
{#if $activePage === 'plusminus'}
	<FuelCounter label="Fuel" stage={$stage} count={$count} />

	<div class={`${gridClass} grid grid-cols-2 grid-rows-[45dvh_1fr]`}>
		<ActionButton value={+1} bind:count={$count} classlist="bg-[#49A078] hover:bg-[#6DB393]" />
		<ActionButton value={+5} bind:count={$count} classlist="bg-[#49A078] hover:bg-[#6DB393]" />
		<ActionButton value={-1} bind:count={$count} classlist="col-span-2 bg-[#FF6663] hover:bg-[#FF8582]" />
	</div>

	<ActionButton label="Back" onClick={() => setActivePage()} classlist={bottomBtnClass} />
{/if}

<!-- PREMATCH PAGE -->
{#if $activePage === 'prematch'}
	<div class={gridClass}>
		<ToggleGroup orientation="vertical" items={['outpost', 'tower', 'depot']}>
			<ToggleButton value="outpost" label="Outpost" />
			<ToggleButton value="tower" label="Tower" />
			<ToggleButton value="depot" label="Depot" />
		</ToggleGroup>
	</div>

	<div class={`${gridClass} grid auto-cols-fr`}>
		<ToggleGroup orientation="horizontal" items={['fielded', 'missed']}>
			<ToggleButton value="fielded" label="Fielded" />
			<ToggleButton value="missed" label="Missed Match" />
		</ToggleGroup>
	</div>

	<ActionButton label="Next Stage" onClick={advanceFlow} classlist={bottomBtnClass} />
{/if}

<!-- AUTO / TELE -->
{#if $activePage === 'auto' || $activePage === 'tele'}
	<FuelCounter label="Fuel Cycle" stage={$stage} count={$count} />

	<div class={`${gridClass} grid auto-rows-[20dvh]`}>
		{#each actionConfigs[$activePage] ?? [] as action}
			<ActionButton
				label={action.label}
				onClick={action.onClick}
				classlist={`m-0 ${action.classlist}`}
			/>
		{/each}
	</div>

	<ActionButton label="Next Stage" onClick={advanceFlow} classlist={bottomBtnClass} />

	{#if $activePage === 'auto'}
		<div class={`${gridClass} grid auto-cols-fr`}>
			<ToggleButton label="Auto Climb" />
		</div>
	{/if}
{/if}

<!-- POSTMATCH -->
{#if $activePage === 'postmatch'}
	<div class={gridClass}>
		<ToggleGroup orientation="vertical" items={['l1', 'l2', 'l3', 'none']}>
			<ToggleButton value="l1" label="L1" />
			<ToggleButton value="l2" label="L2" />
			<ToggleButton value="l3" label="L3" />
			<ToggleButton value="none" label="Not Attempted" />
		</ToggleGroup>
	</div>

	<div class={`${gridClass} grid auto-cols-fr`}>
		<StarRating />
	</div>

	<div class={`${gridClass} grid auto-cols-fr`}>
		<ToggleGroup orientation="horizontal" items={['undamaged', 'broken']}>
			<ToggleButton value="undamaged" label="Undamaged" />
			<ToggleButton value="broken" label="Broken" />
		</ToggleGroup>
	</div>

	<div class={`${gridClass} grid auto-cols-fr`}>
		<ToggleGroup orientation="horizontal" items={['functional', 'died']}>
			<ToggleButton value="functional" label="Functional" />
			<ToggleButton value="died" label="Died on Field" />
		</ToggleGroup>
	</div>

	<ActionButton label="Submit" onClick={resetFlow} classlist={bottomBtnClass} />

	<div class={`${gridClass} grid auto-cols-fr`}>
		<textarea
			name="Notes"
			cols="40"
			rows="5"
			placeholder="Notes"
			bind:value={$notes}
			class="m-2.5 rounded-lg border border-[#C2C2C2] p-3 text-[#C2C2C2]"
		></textarea>
	</div>
{/if}

<!-- HOME -->
{#if $activePage === 'home'}
	<center>
		<p class="m-10 p-1 font-[Poppins] text-5xl font-semibold text-white">
			Hello, {$name}
		</p>
	</center>

	<div class={`${gridClass} mt-3 grid auto-rows-[10dvh]`}>
		{#each actionConfigs.home ?? [] as action}
			<ActionButton
				label={action.label}
				onClick={action.onClick}
				classlist={`m-3 p-2 ${action.classlist}`}
			/>
		{/each}
	</div>

	<!-- SPA-style Logout -->
	<ActionButton
		label="Log Out"
		classlist={bottomBtnClass}
		onClick={() => {
			name.set('');
			activePage.set('login');
		}}
	/>
{/if}

<!-- QUEUE -->
{#if $activePage === 'queue'}
	<center>
		<p class="font-[Poppins] text-5xl font-semibold text-white">queue</p>
	</center>

	<div class={`${gridClass} mt-3 grid auto-rows-[10dvh]`}>
		<ActionButton
			label="Scout"
			onClick={() => setActivePage('prematch')}
			classlist="m-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]"
		/>
	</div>
{/if}

<style>
	:global(body) {
		background-color: #2c2c2c;
	}
</style>
