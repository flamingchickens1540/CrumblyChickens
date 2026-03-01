<script lang="ts">
    //Container with label
    const {
        label,
        isYellow = false,
        padded = false
    }: { label: string; isYellow?: boolean; padded?: boolean } = $props();
</script>

<p class="mx-2.5 mt-4 mb-2 text-left text-2xl text-[#B2B2B2]">
    {label}
</p>
<div
    class="mx-2.5 rounded {isYellow ? 'bg-[#E5AE32] text-black' : 'bg-[#2c2c2c] text-white'} {padded
        ? 'p-3'
        : 'bg-transparent p-0'} text-center text-xl"
>
    <slot />
</div>
