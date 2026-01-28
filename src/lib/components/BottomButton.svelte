<script lang="ts">
	import { goto } from '$app/navigation';

	const { container, label } = $props();

	let stage = $derived(container.stage);
	let count = $derived(container.count);
	let Label = $derived(label);
	let notes = $derived(container.notes);
	let activePage = $derived(container.activePage);

	const flow = ['PreMatch', 'Autonomous', 'Teleoperated', 'PostMatch'] as const;

	const advanceStage = () => {
		if (activePage == 'PostMatch') {
			goto('/');
			container.setStage('PreMatch');
			count = 0;
			notes = '';
		} else if (activePage == 'PlusMinus') {
			container.goToPage(stage);
			container.setStage(stage);
		} else {
			const index = flow.indexOf(stage);
			const nextStage = flow[index + 1];
			container.goToPage(nextStage);
			container.setStage(nextStage);
			count = 0;
		}
	};

	const bottomBtnClass = `m-2.5 inline-flex items-center justify-center 
    rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300 hover:scale-105
    fixed bottom-0 left-3 right-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]`;
</script>

<button class={bottomBtnClass} onclick={() => advanceStage()}>
	<p class="font-[Poppins] text-4xl font-semibold text-white">{Label}</p>
</button>
