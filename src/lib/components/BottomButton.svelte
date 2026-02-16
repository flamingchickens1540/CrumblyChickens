<script lang="ts">
	import { goto } from '$app/navigation';

	let { match_data = $bindable(), plusMinus = $bindable() } = $props();

	let stage = $derived(match_data.stage);
	let count = $derived(match_data.count);
	let notes = $derived(match_data.notes);
	let label = $state('');

	$effect(() => {
		if (plusMinus) {
			label = 'Back';
		} else if (stage == 'PostMatch') {
			label = 'Submit';
		} else {
			label = 'Next Stage';
		}
	});

	const flow = ['PreMatch', 'Auto', 'Tele', 'PostMatch'] as const;

	const handleBottomButton = () => {
		if (plusMinus) {
			plusMinus = false;
			console.log('exit PlusMinus');
			return;
		}

		if (stage === 'PostMatch') {
			goto('/');
			match_data.setStage('PreMatch');
			count = 0;
			notes = '';
			console.log(
				match_data.autoHub,
				match_data.autoShuffle,
				match_data.hub,
				match_data.shuffle,
				match_data.steal
			);
			return;
		}

		if (stage !== 'PostMatch') {
			const nextStage = flow[flow.indexOf(stage) + 1];
			match_data.setStage(nextStage);
			count = 0;
			console.log('next stage');
		}
	};

	const bottomBtnClass = `m-2.5 inline-flex items-center justify-center
		rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300 hover:scale-105
		fixed bottom-0 left-3 right-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]`;
</script>

<button class={bottomBtnClass} onclick={() => handleBottomButton()}>
	<p class="font-[Poppins] text-4xl font-semibold text-white">{label}</p>
</button>
