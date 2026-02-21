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

	let previousMatches: Match[] = [];
	let currentMatch: Match = {
		matchKey: '2025pncmp',
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
	};
	const getColor = (status: 'Pending' | 'Unassigned' | 'Submitted') => {
		switch (status) {
			case 'Pending':
				return 'bg-amber-400';
			case 'Unassigned':
				return 'bg-eerie-black';
			case 'Submitted':
				return 'bg-emerald-400';
		}
	};
</script>

<div class="bg-gunmetal col-span-2 flex flex-col gap-2 rounded p-2">
	<span class="col-span-3 text-center">Current Robots</span>
	<div class="grid max-h-28 grid-cols-3 gap-2">
		{#each currentMatch.red as tm}
			<button class="bg-first-red grid h-12 grid-cols-2 place-items-center rounded p-2"
				>{tm.teamKey}
				<div class="size-6 rounded-full {getColor(tm.status)}"></div>
			</button>
		{/each}
		{#each currentMatch.blue as tm}
			<button class="bg-first-blue grid h-12 grid-cols-2 place-items-center rounded p-2"
				>{tm.teamKey}
				<div class="size-6 rounded-full {getColor(tm.status)}"></div>
			</button>
		{/each}
	</div>
</div>
