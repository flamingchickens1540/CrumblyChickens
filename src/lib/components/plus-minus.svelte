<script lang="ts">
	interface Props {
		value: number;
		count?: number;
		disabled?: boolean;
	}

	let { value, count = $bindable<number>(), disabled = false }: Props = $props();

	function handleClick() {
		count += value;
	}
</script>

<button
	class="m-2.5 inline-flex justify-center rounded-lg border-5
	       border-[#e7c600] bg-[#5faad7] px-8 py-2
	       transition-transform duration-300 hover:scale-110"
	onclick={handleClick}
	{disabled}
>
	{value > 0 ? `+${value}` : value}
</button>
