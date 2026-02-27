<script lang="ts">
    import { ClipboardList } from 'lucide-svelte';
    import { Camera } from 'lucide-svelte';
    import { goto } from '$app/navigation';
    import ButtonBack from '$lib/components/ButtonBack.svelte';
    import type { TeamEvent } from '@/types';
    import type { PageProps } from './$types';
    import { browser } from '$app/environment';
    const { data }: PageProps = $props();
    let teamEvents = data.teamEvents;
</script>

<center class="font-[Poppins] font-normal">
    <p class="m-4 mb-0 text-6xl font-bold text-amber-400">Team List</p>
    <p class="text-3xl text-gray-400">Pitscout</p>

    <div class="mx-2.5 mt-3 rounded bg-gray-900 p-1 text-center text-xl text-white">
        {#each teamEvents as team, i (team.teamKey)}
            <div class="flex w-full p-2 {i == 0 ? '' : 'border-t-2 border-gray-400'}">
                <Camera class={'text-amber-400'} />
                <ClipboardList class={team.completed ? 'text-amber-400' : 'text-white'} />
                <button
                    onclick={() => {
                        browser && localStorage.setItem('teamData', JSON.stringify(team));
                        goto(`/pitscout/collect?team=${team.teamKey}`);
                    }}
                    class="ml-2">{team.teamKey}</button
                >
            </div>
        {/each}
    </div>
</center>

<ButtonBack link="/" />
