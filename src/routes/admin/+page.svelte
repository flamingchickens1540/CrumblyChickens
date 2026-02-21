<script lang="ts">
    import { io, type Socket } from 'socket.io-client';
    import { type Match } from '$lib/types';
    type NewMatch = {
        matchKey: string;
        red: [string, string, string];
        blue: [string, string, string];
    };
    const username = 'Autumn';
    const socket: Socket = io('/admin', { auth: { username } });
    let scouts: string[] = $state([]);

    let currentMatch: Match = $state(emptyMatch());
    let nextMatch: NewMatch = $state(emptyNextMatch());
    socket.on(
        'handshake_data',
        ([scoutQueue, robotQueue]: [string[], { teamKey: number; color: 'red' | 'blue' }[]]) => {
            console.log(scouts);
            scouts = scoutQueue;
            currentMatch = emptyMatch();
            let redI = 0;
            let blueI = 0;
            for (const robot of robotQueue) {
                if (robot.color === 'red') {
                    currentMatch.red[redI].teamKey = robot.teamKey;
                    redI += 1;
                } else {
                    currentMatch.blue[blueI].teamKey = robot.teamKey;
                    blueI += 1;
                }
            }
        }
    );
    socket.on('scout_joined_queue', (username) => scouts.push(username));
    socket.on('scout_recieved_robot', (robot, username) => {
        scouts.splice(scouts.indexOf(username), 1);
    });

    function emptyMatch(): Match {
        return {
            matchKey: '',
            red: [
                { status: 'Unassigned', teamKey: -1 },
                { status: 'Unassigned', teamKey: -1 },
                { status: 'Unassigned', teamKey: -1 }
            ],
            blue: [
                { status: 'Unassigned', teamKey: -1 },
                { status: 'Unassigned', teamKey: -1 },
                { status: 'Unassigned', teamKey: -1 }
            ]
        };
    }
    function clearRobots() {
        socket.emit('clear_robots');
        currentMatch = emptyMatch();
    }
    function removeScout(username: string) {
        scouts.splice(scouts.indexOf(username), 1);
        socket.emit('remove_scout', username);
    }
    function sendMatch() {
        const parsedMatch = parseNextMatch();
        if (!parsedMatch) {
            return;
        }
        nextMatch = emptyNextMatch();

        const robotQueue = [
            ...parsedMatch.red.map((robot) => {
                return { teamKey: robot.teamKey, color: 'red' };
            }),
            ...parsedMatch.blue.map((robot) => {
                return { teamKey: robot.teamKey, color: 'blue' };
            })
        ];
        socket.emit('send_match', robotQueue);
        currentMatch = parsedMatch;
    }
    function emptyNextMatch(): NewMatch {
        return { matchKey: '', red: ['', '', ''], blue: ['', '', ''] };
    }
    function parseNextMatch(): Match | null {
        const parsed = {
            matchKey: nextMatch.matchKey,
            red: [
                { status: 'Unassigned', teamKey: parseInt(nextMatch.red[0]) },
                { status: 'Unassigned', teamKey: parseInt(nextMatch.red[1]) },
                { status: 'Unassigned', teamKey: parseInt(nextMatch.red[2]) }
            ],

            blue: [
                { status: 'Unassigned', teamKey: parseInt(nextMatch.blue[0]) },
                { status: 'Unassigned', teamKey: parseInt(nextMatch.blue[1]) },
                { status: 'Unassigned', teamKey: parseInt(nextMatch.blue[2]) }
            ]
        } satisfies Match;
        parsed.red.forEach((robot) => {
            if (!robot.teamKey) {
                return null;
            }
        });
        parsed.blue.forEach((robot) => {
            if (!robot.teamKey) {
                return null;
            }
        });

        return parsed;
    }
    const eventKey = '2026fake';

    // let lastLoad: [string, boolean] = $state(['', false]);

    // Store this on server with WS
    // let previousMatches: Match[] = [];

    let matchKey = $derived(eventKey + '_' + (currentMatch.matchKey ?? ''));

    const getColor = (status: 'Pending' | 'Unassigned' | 'Submitted'): string => {
        switch (status) {
            case 'Pending':
                return 'bg-crayola-orange';
            case 'Unassigned':
                return 'bg-eerie-black';
            case 'Submitted':
                return 'bg-jungle-green';
        }
    };
</script>

<div class="grid grid-cols-3 gap-4 text-white">
    <div class="gap-2">
        <div class="bg-gunmetal flex flex-col gap-2 rounded p-2">
            <div class="grid grid-cols-2 gap-4">
                <input
                    bind:value={nextMatch.matchKey}
                    placeholder="Next Match"
                    class="bg-eerie-black rounded p-2"
                />
                <button onclick={sendMatch} class="bg-eerie-black rounded p-2">Queue Match</button>
            </div>
            <div class="rounded-2 grid grid-cols-3 gap-2">
                {#each nextMatch.red as _, i}
                    <input class="bg-first-red h-12 rounded p-2" bind:value={nextMatch.red[i]} />
                {/each}
                {#each nextMatch.blue as _, i}
                    <input class="bg-first-blue h-12 rounded p-2" bind:value={nextMatch.blue[i]} />
                {/each}
            </div>
        </div>
        <!-- Current Match Display -->
        <div class="bg-gunmetal flex flex-col gap-2 rounded p-2">
            <div class="grid grid-cols-3">
                <span class="">{currentMatch?.matchKey}</span>
                <span class="justify-self-center">Current Match</span>
            </div>
            <div class="grid max-h-28 grid-cols-3 gap-2">
                {#each currentMatch.red as tm}
                    <button
                        class="{getColor(
                            tm.status
                        )} grid h-12 grid-cols-2 place-items-center rounded p-2"
                        >{tm.teamKey}
                        <div class="bg-first-red size-6 rounded-full"></div>
                    </button>
                {/each}
                {#each currentMatch.blue as tm}
                    <button
                        class="{getColor(
                            tm.status
                        )} grid h-12 grid-cols-2 place-items-center rounded p-2"
                        >{tm.teamKey}
                        <div class="bg-first-blue size-6 rounded-full"></div>
                    </button>
                {/each}
            </div>
        </div>
    </div>
    <div>
        {#each scouts as scout}
            <button onclick={() => removeScout(scout)}>{scout}</button>
        {/each}
    </div>
    <div>
        <button onclick={clearRobots} class="rounded p-2 outline">Clear Robots</button>
        <button onclick={sendMatch} class="rounded p-2 outline">Send Match</button>
    </div>
</div>
