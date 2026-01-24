<script lang="ts">
	interface Props {
		currentStage: string;
	}

	let { currentStage }: Props = $props();
</script>

<center>
	<p class="font-[Poppins] font-bold text-[#FF4848] text-6xl m-4 mb-0">
		1540
    </p>
    <p class="font-[Poppins] text-[#C2C2C2] text-3xl">
        {currentStage}
    </p>
</center>