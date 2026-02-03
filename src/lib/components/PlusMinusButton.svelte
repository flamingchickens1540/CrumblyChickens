<script lang="ts">
	interface Props {
		value: number;
		count: number;
		classlist?: string;
	}

	let { value, count = $bindable<number>(), classlist = '' }: Props = $props();

	function handleClick() {
		count = Math.max(0, count + value);
	}
</script>

<button
	class="m-2.5 inline-flex items-center justify-center rounded-md
	       px-8 py-2 drop-shadow-xl
	       transition-transform duration-300 hover:scale-105 {classlist}"
	onclick={handleClick}
>
	<p class="font-[Poppins] text-4xl font-semibold text-white">
		{value > 0 ? `+${value}` : value}
	</p>
</button>
