<script lang="ts">
    //Container with label
    const { label, isYellow = false, padded = false }: {label: string, isYellow?: boolean, padded?: boolean} = $props()
</script>

<p class="text-2xl text-gray-400 mt-4 mb-2 text-left mx-2.5">
    {label}
</p>
<div class="rounded justify-self-start justify-self-center mx-2.5 {isYellow ? 'bg-amber-300 text-black' : 'bg-gray-900 text-white'} {padded ? 'p-3' : 'p-0 bg-transparent'} text-center text-xl">
    <slot/>
</div>
