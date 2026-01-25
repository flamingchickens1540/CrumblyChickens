<script lang="ts">
	const { items, selectedValue } = $props<{
		items: string[];
		selectedValue?: string;
	}>();

	let selected = $state<string | undefined>(undefined);

	$effect(() => {
		if (selectedValue !== undefined) {
			selected = selectedValue;
		} else if (items.length && selected === undefined) {
			selected = items[0];
		}
	});

	function select(value: string) {
		selected = value;
	}

	const isFirst = (index: number) => index === 0;
	const isLast = (index: number) => index === items.length - 1;
</script>

<div class="mx-2.5 mt-3 flex flex-col">
	{#each items as item, i}
		<button
			type="button"
			onclick={() => select(item)}
			aria-pressed={selected === item}
			class={`
				relative m-0 inline-flex items-center
				justify-start border border-[#C2C2C2] px-8 py-2 text-left
				${selected === item ? 'bg-[#E5AE32] text-black' : 'bg-[#2C2C2C] text-white'}
				${isFirst(i) ? 'rounded-t-lg' : ''}
				${isLast(i) ? 'rounded-b-lg' : ''}
			`}
		>
			{#if selected === item}
				<span class="mr-2 font-[Poppins] font-bold">✓</span>
			{/if}
			<span class="font-[Poppins] text-xl whitespace-nowrap">
				{item}
			</span>
		</button>
	{/each}
</div>
