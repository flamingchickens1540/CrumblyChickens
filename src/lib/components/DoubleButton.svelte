<script lang="ts">
    let {
        leftLabel,
        rightLabel,
        leftOnClick,
        rightOnClick,
        classes = ''
    }: {
        leftLabel: string;
        rightLabel: string;
        leftOnClick: () => void;
        rightOnClick: () => void;
        classes?: string;
    } = $props();

    const bottomBtnClass = `m-2.5 inline-flex items-center justify-center
		rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300 hover:scale-105
		bottom-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D] ${classes}`;
</script>

<div class="flex flex-row justify-center">
    <button class={bottomBtnClass} onclick={leftOnClick}>
        <p class="mb-1 font-[Poppins] text-3xl font-semibold text-white">
            {leftLabel}
        </p>
    </button>

    <button class={bottomBtnClass} onclick={rightOnClick}>
        <p class="mb-1 font-[Poppins] text-3xl font-semibold text-white">
            {rightLabel}
        </p>
    </button>
</div>
