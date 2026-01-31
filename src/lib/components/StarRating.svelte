<script lang="ts">
	import { Star } from 'lucide-svelte';
	let rating = $state(1);
</script>

<div class="relative mt-5 mx-2.5 mb-2.5 rounded-md border border-[#C2C2C2] px-4 py-2">
	<span
		class="absolute -top-2 left-3 bg-[#2c2c2c]
           px-2 font-[Poppins] text-sm text-[#C2C2C2]"
	>
		Driver Skill
	</span>

	<div class="flex w-full items-center">
		{#each Array(5) as _, i}
			<button onclick={() => {rating = i + 1}} class="flex flex-1 items-center justify-center py-1">
				<Star
					class="h-8 w-8 scale-[1.3]
            {rating > i ? 'fill-yellow-400' : 'fill-[#C2C2C2]'}
            stroke-none"
				/>
			</button>
		{/each}
	</div>
</div>
