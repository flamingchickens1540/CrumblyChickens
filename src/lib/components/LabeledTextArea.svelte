<script>
    let { label } = $props();
    //Textarea with label
    //Create a textarea with bound value in slot with class="outline-none w-full"
</script>

<div class="text-l mb-3 w-full rounded bg-[#2c2c2c] p-1 text-left text-white">
    <label class="text-left">
        <span class="text-[#B2B2B2]">{label}</span>
        <hr class="p-2" />
        <slot />
    </label>
</div>
