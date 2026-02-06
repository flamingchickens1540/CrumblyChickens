<script lang="ts">
	import { goto } from '$app/navigation';

	const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
</script>

<center>
	<p class="font-[Poppins] text-5xl font-semibold text-white">queue</p>
</center>

<div class={`${gridClass} mt-3 grid auto-rows-[10dvh]`}>
	<button
		class="m-2.5 inline-flex items-center justify-center rounded-md
					bg-[#5C5C5C] p-2 px-8
					py-2 drop-shadow-xl transition-transform duration-300
					hover:scale-105 hover:bg-[#7D7D7D]"
		onclick={() => goto('/matchscout')}
	>
		<p class="font-[Poppins] text-4xl font-semibold text-white">Scout</p>
	</button>
</div>
