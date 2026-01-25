<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	type ToggleGroupContext = {
		selected: Writable<string | null>;
		orientation: 'horizontal' | 'vertical';
		isFirst: (v: string) => boolean;
		isLast: (v: string) => boolean;
	};

	export let value: string | null = null;
	export let label = '';
	export let checked = false;

	const group = getContext<ToggleGroupContext>('toggle-group');

	let isActive = checked;
	let unsubscribe: (() => void) | undefined;

	if (group && value !== null) {
		unsubscribe = group.selected.subscribe(v => {
			isActive = v === value;
		});
	}

	function handleClick() {
		if (group) {
			group.selected.update((v) => (v === value ? null : value));
		} else {
			isActive = !isActive;
		}
	}

	$: orientation = group?.orientation ?? 'horizontal';
	$: isFirst = !!(group && value !== null && group.isFirst(value));
	$: isLast = !!(group && value !== null && group.isLast(value));
	$: isSolo = !group;
</script>

<button
	type="button"
	onclick={handleClick}
	aria-pressed={isActive}
	class="
    relative inline-flex items-center justify-center
    border border-[#C2C2C2] m-0 px-8 py-2
  "
	class:bg-[#E5AE32]={isActive && !isSolo}
	class:bg-[#315F94]={isActive && isSolo}
	class:text-black={isActive && !isSolo}
	class:bg-[#2C2C2C]={!isActive}
	class:text-white={!isActive || isSolo}
    class:justify-center={orientation === 'horizontal'}
    class:justify-start={orientation === 'vertical'}
    class:text-center={orientation === 'horizontal'}
    class:text-left={orientation === 'vertical'}

    class:rounded-[8px]={isSolo}
	class:mx-2.5={isSolo}
    
	class:rounded-l-[8px]={!isSolo && orientation === 'horizontal' && isFirst}
	class:rounded-r-[8px]={!isSolo && orientation === 'horizontal' && isLast}
	class:rounded-t-[8px]={!isSolo && orientation === 'vertical' && isFirst}
	class:rounded-b-[8px]={!isSolo && orientation === 'vertical' && isLast}

	class:flex-1={orientation === 'horizontal'}
>
	{#if isActive}
		<span class="mr-2 font-bold font-[Poppins]">✓</span>
	{/if}
	<span class="whitespace-nowrap text-xl font-[Poppins]">{label}</span>
</button>