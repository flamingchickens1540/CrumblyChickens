<script lang="ts">
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { LocalStore, localStore } from '@/localStore.svelte.js';
    import type { TeamMatch } from '@/types.js';
    import { io, type Socket } from 'socket.io-client';

    const { data } = $props();
    const socket: Socket = io('/queue', {
        auth: {
            username: data.user
        }
    });

    const team_match: LocalStore<TeamMatch> = localStore("matchData", {
            teamKey: 0,
            matchKey: "qm1",
            eventKey: '2026testing', // TODO Manually change or read from env or smth

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
    })

    socket.on('leave_queue', () => {
        socket.disconnect();
        goto(resolve('/'));
    });
    socket.on('recieve_robot', ({ robot, match_key }: { robot: { teamKey: number; color: 'red' | 'blue' }, match_key: string }) => {
        const new_team_match: TeamMatch = {
            teamKey: robot.teamKey,
            matchKey: match_key,
            eventKey: '2026testing', // TODO Manually change or read from env or smth

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
            team_match.value = new_team_match;
        }

        socket.disconnect();
        goto(`/matchscout?color=${robot.color}`);
    });
    const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
</script>

<center>
    <p class="font-[Poppins] text-5xl font-semibold text-white">Leave</p>
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
        <p class="font-[Poppins] text-4xl font-semibold text-white">Scout</p>
    </button>
</div>
