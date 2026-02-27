<script lang="ts">
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { LocalStore, localStore } from '@/localStore.svelte.js';
    import type { TeamMatch } from '@/types.js';
    import { io, type Socket } from 'socket.io-client';
    import { onMount } from 'svelte';
    const { data } = $props();
    import { page } from '$app/stores';
    let socket: Socket;
    let teamMatch: LocalStore<TeamMatch>;
    let recievedMatch = false;
    onMount(() => {
        teamMatch = localStore('matchData', {
            teamKey: 0,
            matchKey: 'qm1',
            eventKey: '2026orco', // TODO Manually change or read from env or smth

            autoStart: 'Tower',
            fielded: true,
            autoHub: 0,
            autoShuffle: 0,
            autoClimb: false,
            teleHub: 0,
            teleShuffle: 0,
            teleSteal: 0,
            climb: 'None',
            skill: 1,
            broken: false,
            died: false,
            notes: '',

            scout: data.user
        });
        socket = io('/queue', {
            auth: {
                username: data.user
            }
        });
        socket.on('disconnect', (reason) => {
            console.log(reason);
            if (!recievedMatch) {
                goto(resolve('/'));
            }
        });
        socket.on(
            'recieve_robot',
            ({
                robot,
                matchKey
            }: {
                robot: { teamKey: number; color: 'red' | 'blue' };
                matchKey: string;
            }) => {
                const newTeamMatch: TeamMatch = {
                    teamKey: robot.teamKey,
                    matchKey: matchKey,
                    eventKey: '2026orco', // TODO Manually change or read from env or smth

                    autoStart: 'Tower',
                    fielded: true,
                    autoHub: 0,
                    autoShuffle: 0,
                    autoClimb: false,
                    teleHub: 0,
                    teleShuffle: 0,
                    teleSteal: 0,
                    climb: 'None',
                    skill: 1,
                    broken: false,
                    died: false,
                    notes: '',

                    scout: data.user
                };

                if (browser) {
                    teamMatch.value = newTeamMatch;
                }
                recievedMatch = true;
                socket.emit('scouting');
                goto(`/matchscout?color=${robot.color}`);
            }
        );
    });
    const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
</script>

<center>
    <p class="font-[Poppins] text-5xl font-semibold text-white">Queue</p>
</center>

<div class={`${gridClass} mt-3 grid auto-rows-[10dvh]`}>
    <button
        class="m-2.5 inline-flex items-center justify-center rounded-md
					bg-[#5C5C5C] p-2 px-8
					py-2 drop-shadow-xl transition-transform duration-300
					hover:scale-105 hover:bg-[#7D7D7D]"
        onclick={() => {
            socket.disconnect();
            goto(resolve('/'));
        }}
    >
        <p class="font-[Poppins] text-4xl font-semibold text-white">Leave</p>
    </button>
</div>
