<script lang="ts">
	const { label } = $props<{
		label: string;
	}>();

	let checked = $state(false);
</script>

<button
	type="button"
	onclick={() => {checked = !checked}}
	aria-pressed={checked}
	class="
		relative m-0 mx-2.5 inline-flex
		items-center justify-center rounded-lg border border-[#C2C2C2] px-8 py-2 text-white
	"
	class:bg-[#315F94]={checked}
	class:bg-[#2C2C2C]={!checked}
>
	{#if checked}
		<span class="mr-2 font-[Poppins] font-bold">✓</span>
	{/if}
	<span class="font-[Poppins] text-xl whitespace-nowrap">{label}</span>
</button>
