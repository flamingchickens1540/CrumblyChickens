<script lang="ts">
	type Pending = {
		status: 'Pending';
		teamKey: number;
		scout: string;
	}; // Scout recieved, hasn't scouted
	type Unassigned = {
		status: 'Unassigned';
		teamKey: number;
	}; // If not enough scouts scheduled
	type Submitted = {
		status: 'Submitted';
		teamKey: number;
		scout: string;
		data: {};
	};
	type TeamMatch = Unassigned | Pending | Submitted;
	type Match = {
		matchKey: string;
		red: [TeamMatch, TeamMatch, TeamMatch];
		blue: [TeamMatch, TeamMatch, TeamMatch];
	};

	// Pull from DB
	const eventKey = '2026fake';

	let upcomingMatch = $state({
		matchKey: '',
		red: ['', '', ''],
		blue: ['', '', '']
	});

	let lastLoad: [string, boolean] = $state(['', false]);
	let canLoad = $derived(upcomingMatch.matchKey != '');
	let canQueue = $derived(upcomingMatch.matchKey);

	// Store this on server with WS
	let previousMatches: Match[] = [];

	let currentMatch: Match = $state({
		matchKey: 'qm1',
		red: [
			{
				status: 'Unassigned',
				teamKey: 1540
			},
			{ status: 'Submitted', teamKey: 2910, scout: 'Autumn', data: {} },
			{ status: 'Pending', teamKey: 2046, scout: 'Crow' }
		],
		blue: [
			{
				status: 'Unassigned',
				teamKey: 1540
			},
			{ status: 'Submitted', teamKey: 2910, scout: 'Autumn', data: {} },
			{ status: 'Pending', teamKey: 2046, scout: 'Crow' }
		]
	});

	let matchKey = $derived(eventKey + '_' + currentMatch.matchKey);

	const getColor = (status: 'Pending' | 'Unassigned' | 'Submitted'): string => {
		switch (status) {
			case 'Pending':
				return 'bg-crayola-orange';
			case 'Unassigned':
				return 'bg-eerie-black';
			case 'Submitted':
				return 'bg-jungle-green';
		}
	};
	const getHiddenCss = (hidden: boolean) => (hidden ? 'pointer-events-none opacity-30' : '');
	const queueMatch = () => {
		canQueue = 'pointer-events-none opacity-30';
		// send out match to WS, allow scouts to start working
	};
	const loadMatch = () => {
		canQueue = '';
		// Get match from TBA, allow for validation
	};
	const startMatch = () => {
		matchKey = upcomingMatch.matchKey;
		currentMatch = upcomingMatch;
		// maybe broadcast smth to scouts
	};
</script>

<!-- Match Scheduler -->
<div>
	<div class="bg-gunmetal flex flex-col gap-2 rounded p-2">
		<div class="grid grid-cols-2 grid-rows-2">
			<input
				bind:value={upcomingMatch.matchKey}
				placeholder="Next Match"
				class="bg-eerie-black rounded p-2"
			/>
			<button class="bg-eerie-black rounded p-2 {canLoad}" onclick={loadMatch}>Load Match</button>
			<button onclick={queueMatch} class="bg-eerie-black rounded p-2 {canQueue}">Queue Match</button
			>
		</div>
	</div>
	<!-- Current Match Display -->
	<div class="bg-gunmetal flex flex-col gap-2 rounded p-2">
		<div class="grid grid-cols-3">
			<span class="">{shortMatchKey}</span>
			<span class="justify-self-center">Current Match</span>
		</div>
		<div class="grid max-h-28 grid-cols-3 gap-2">
			{#each currentMatch.red as tm}
				<button class="{getColor(tm.status)} grid h-12 grid-cols-2 place-items-center rounded p-2"
					>{tm.teamKey}
					<div class="bg-first-red size-6 rounded-full"></div>
				</button>
			{/each}
			{#each currentMatch.blue as tm}
				<button class="{getColor(tm.status)} grid h-12 grid-cols-2 place-items-center rounded p-2"
					>{tm.teamKey}
					<div class="bg-first-blue size-6 rounded-full"></div>
				</button>
			{/each}
		</div>
	</div>
	<!-- Past Match Display -->
</div>
