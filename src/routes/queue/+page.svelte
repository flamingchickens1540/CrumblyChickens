<script lang="ts">
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import type { TeamMatch } from '@/types.js';
    import { io, type Socket } from 'socket.io-client';
    import { PUBLIC_EVENT_KEY } from '$env/static/public';

    const { data } = $props();

    let receivedMatch = false;

    let socket: Socket = io('/queue', {
        auth: {
            username: data.user
        }
    });

    socket.on('disconnect', (reason) => {
        if (!receivedMatch) {
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
            console.log(robot)
            const newTeamMatch: TeamMatch = {
                teamKey: robot.teamKey,
                matchKey,
                eventKey: PUBLIC_EVENT_KEY,

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
            browser && localStorage.setItem('matchData', JSON.stringify(newTeamMatch));
            receivedMatch = true;

            socket.emit('scouting');
            goto(resolve(`/matchscout?color=${robot.color}`));
        }
    );
    const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
</script>

<center>
    <p class="font-[Poppins] text-5xl font-semibold text-white">Queue</p>
</center>

<div class={`${gridClass} mt-3 grid auto-rows-[90dvh]`}>
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
