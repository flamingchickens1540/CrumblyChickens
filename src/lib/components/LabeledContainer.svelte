<script lang="ts">
    //Container with label
    const {
        label,
        isYellow = false,
        padded = false
    }: { label: string; isYellow?: boolean; padded?: boolean } = $props();
</script>

<p class="mx-2.5 mt-4 mb-2 text-left text-2xl text-gray-400">
    {label}
</p>
<div
    class="mx-2.5 justify-self-center rounded {isYellow
        ? 'bg-amber-300 text-black'
        : 'bg-gray-900 text-white'} {padded ? 'p-3' : 'bg-transparent p-0'} text-center text-xl"
>
    <slot />
</div>
