<script lang="ts">
    import { ClipboardList } from 'lucide-svelte';
    import { Camera } from 'lucide-svelte';
    import { goto } from '$app/navigation';
    import ButtonBack from '$lib/components/ButtonBack.svelte';
    import { resolve } from '$app/paths';

    let teams: { number: number; images: boolean; data: boolean }[] = [
        { number: 1844, images: true, data: false },
        { number: 1540, images: false, data: true }
    ];
</script>

<center class="font-[Poppins] font-normal">
    <p class="m-4 mb-0 text-6xl font-bold text-amber-400">Team List</p>
    <p class="text-3xl text-gray-400">Pitscout</p>

    <div
        class="mx-2.5 mt-3 justify-self-center rounded bg-gray-900 p-1 text-center text-xl text-white"
    >
        {#each teams as team, i (team.number)}
            <div class="flex w-full p-2 {i == 0 ? '' : 'border-t-2 border-gray-400'}">
                <Camera class={team.images ? 'text-amber-400' : 'text-white'} />
                <ClipboardList class={team.data ? 'text-amber-400' : 'text-white'} />
                <button onclick={() => goto(resolve(`/pitscout/collect`))} class="ml-2"
                    >{team.number}</button
                >
            </div>
        {/each}
    </div>
</center>

<ButtonBack link="/" />
