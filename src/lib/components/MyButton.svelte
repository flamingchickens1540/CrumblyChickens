<script lang="ts">
    export let label: string;
    export let toggle: () => void;
</script>

<input
    type="button" 
    class="m-1 bg-gray-600 hover:bg-gray-400 active:bg-gray-400"   
    onclick={toggle}
    onkeydown={toggle}
    value={label}
/>