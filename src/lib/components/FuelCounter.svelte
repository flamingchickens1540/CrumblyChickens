<script lang="ts">
	export let label: string = '';
	export let stage: string;
	export let count: number;
</script>

<div class="mx-3 mt-3 mb-0 flex justify-between px-1 pt-1 pb-0">
	<span class="mx-3 mt-2 font-[Poppins] text-xl text-white">
		<strong>{label}</strong>
	</span>

	<span class="mx-3 mt-2 font-[Poppins] text-xl text-white">
		Total in {stage}: {count}
	</span>
</div>