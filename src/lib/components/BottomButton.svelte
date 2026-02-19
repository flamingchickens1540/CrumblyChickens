<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { GameStage, TeamMatch } from '$lib/types';

	let {
		match_data,
		stage = $bindable(),
		plusMinus = $bindable()
	}: { match_data: TeamMatch; stage: GameStage; plusMinus: boolean } = $props();

	const label = $derived(plusMinus ? 'Back' : stage === 'PostMatch' ? 'Submit' : 'Next Stage');
	const flow = ['PreMatch', 'Auto', 'Tele', 'PostMatch'] as const;

	const handleBottomButton = async () => {
		if (plusMinus) {
			plusMinus = false;
			console.log('Exiting PlusMinus');
			return;
		}

		if (stage === 'PostMatch') {
			stage = 'PreMatch';

			console.log('Submitting match:');
			console.log(JSON.stringify(match_data));

			await fetch('/api/submit/match', {
				method: 'POST',
				body: JSON.stringify(match_data)
			});
			goto(resolve('/'));

			return;
		}

		const nextStage = flow[flow.indexOf(stage) + 1];
		stage = nextStage;
		console.log('Next Stage');
	};

	const bottomBtnClass = `m-2.5 inline-flex items-center justify-center
		rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300 hover:scale-105
		fixed bottom-0 left-3 right-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]`;
</script>

<button class={bottomBtnClass} onclick={async () => await handleBottomButton()}>
	<p class="font-[Poppins] text-4xl font-semibold text-white">{label}</p>
</button>
