<script lang="ts">
	import { activePage } from '$lib/state';
	import { goto } from '$app/navigation';

	export let data;

	type HomeAction = {
		label: string;
		classlist?: string;
		onClick: () => void;
	};

	const actions: HomeAction[] = [
		{
			label: 'Match Scout',
			onClick: () => {
			if (!data.user) {
				goto('/login');
			} else {
				activePage.set('queue');
				goto('/');
			}
			}
		},
		{
			label: 'Pit Scout',
			onClick: () => goto('/pitscout')
		},
		{
			label: 'Analysis',
			onClick: () => goto('/analysis')
		},
		{
			label: 'Leaderboard',
			onClick: () => goto('/leaderboard')
		}
	];

	const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
	const bottomBtnClass =
		'fixed bottom-0 left-3 right-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]';
</script>

<center>
	<p class="m-10 p-1 font-[Poppins] text-5xl font-semibold text-white">
		Hello, {data.user}
	</p>
</center>

<div class={`${gridClass} mt-3 grid auto-rows-[10dvh]`}>
	{#each actions as action}
		<button
			class="m-2.5 inline-flex items-center justify-center rounded-md
				px-8 py-2 drop-shadow-xl
				transition-transform duration-300 hover:scale-105 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]"
			onclick={action.onClick}
		>
			<p class="text-white font-[Poppins] font-semibold text-4xl">
				{action.label}
			</p>
		</button>
	{/each}
</div>

<button
	class="m-2.5 inline-flex items-center justify-center rounded-md
	       px-8 py-2 drop-shadow-xl
	       transition-transform duration-300 hover:scale-105 {bottomBtnClass}"
	onclick={() => goto('/login')}
>
	<p class="text-white font-[Poppins] font-semibold text-4xl">
		Log Out
	</p>
</button>

<style>
	:global(body) {
		background-color: #2c2c2c;
	}
</style>
