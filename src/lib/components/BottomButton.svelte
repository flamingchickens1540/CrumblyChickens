<script lang="ts">
	import { goto } from '$app/navigation';

	const {
		activePage: ActivePage,
		stage: Stage,
		count: Count,
		label: Label,
		notes: Notes,
		goToPage,
		setStage
	} = $props();

	let stage = $derived(Stage);
	let count = $derived(Count);
	let label = $derived(Label);
	let notes = $derived(Notes);
	let activePage = $derived(ActivePage);

	const flow = ['PreMatch', 'Autonomous', 'Teleoperated', 'PostMatch'] as const;

	const advanceStage = () => {
		if (activePage == 'PostMatch') {
			goto('/home');
			setStage('PreMatch');
			count = 0;
			notes = '';
		} else if (activePage == 'PlusMinus') {
			goToPage(stage);
			setStage(stage);
		} else {
			const index = flow.indexOf(stage);
			const nextStage = flow[index + 1];
			goToPage(nextStage);
			setStage(nextStage);
			count = 0;
		}
	};

	const bottomBtnClass = `m-2.5 inline-flex items-center justify-center 
    rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300 hover:scale-105
    fixed bottom-0 left-3 right-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]`;
</script>

<button class={bottomBtnClass} onclick={() => advanceStage()}>
	<p class="font-[Poppins] text-4xl font-semibold text-white">{label}</p>
</button>
