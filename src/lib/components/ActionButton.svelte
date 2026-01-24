<script lang="ts">
	interface Props {
		label?: string;
		value?: number;
		count?: number;
		onClick?: () => void;
		disabled?: boolean;
		classlist?: string;
	}

	let {
		label,
		value,
		count = $bindable<number>(),
		onClick,
		disabled = false,
		classlist = ''
	}: Props = $props();

	function handleClick() {
		if (typeof value === 'number') {
			count += value;
		}
		onClick?.();
	}
</script>

<button
	class="m-2.5 inline-flex items-center justify-center rounded-md
	       px-8 py-2 drop-shadow-xl
	       transition-transform duration-300 hover:scale-105 {classlist}"
	onclick={handleClick}
	{disabled}
>
	<p class="text-white font-[Poppins] font-semibold text-4xl">
		{#if typeof value === 'number'}
			{value > 0 ? `+${value}` : value}
		{:else}
			{label}
		{/if}
	</p>
</button>
