<script lang="ts">
	interface Props {
		value: number;
		count?: number;
		disabled?: boolean;
		classlist: string;
	}

	let { value, count = $bindable<number>(), disabled = false, classlist = "" }: Props = $props();

	function handleClick() {
		count += value;
	}
</script>

<button
	class="m-2.5 inline-flex items-center justify-center rounded-md
	       px-8 py-2 drop-shadow-xl
	       transition-transform duration-300 hover:scale-105 {classlist}" 
	onclick={handleClick}
	{disabled}
>
	<p class="text-white font-[Poppins] font-semibold text-8xl">
		{value > 0 ? `+${value}` : value}
	</p>
</button>