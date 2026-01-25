<script lang="ts">
	const {
		label = '',
		stage,
		count
	} = $props<{
		label?: string;
		stage: string;
		count: number;
	}>();
</script>

<div class="mx-3 mt-3 mb-0 flex justify-between px-1 pt-1 pb-0">
	<span class="mx-3 mt-2 font-[Poppins] text-xl text-white">
		<strong>{label}</strong>
	</span>

	<span class="mx-3 mt-2 font-[Poppins] text-xl text-white">
		Total in {stage}: {count}
	</span>
</div>
