<script lang="ts">
    import { io, type Socket } from 'socket.io-client';
    import { type Match, type Robot } from '$lib/types';
    import type { PageProps } from './$types';
    type NewMatch = {
        matchKey: string;
        red: [string, string, string];
        blue: [string, string, string];
    };

    const { data }: PageProps = $props();
    const socket: Socket = io('/admin', { auth: { username: data.user } });
    let scouts: string[] = $state([]);

    let event_key: string = $state('');

    let currentMatch: Match | null = $state(null);
    let nextMatch: NewMatch = $state(emptyNextMatch());

    socket.on('handshake_data', ([scoutQueue, match]: [string[], Match | null]) => {
        console.log('replaced scout queue: ' + $state.snapshot(scouts));
        scouts = scoutQueue;
        currentMatch = match;
    });
    socket.on('scout_left_queue', (username) => {
        const i = scouts.indexOf(username);
        if (i == -1) return;

        scouts.splice(i, 1);
    });
    socket.on('scout_joined_queue', (username) => scouts.push(username));
    socket.on('scout_recieved_robot', ([match, username]) => {
        console.log(match);
        currentMatch = match;
        scouts.splice(scouts.indexOf(username), 1);
    });

    function clearRobots() {
        socket.emit('clear_robots');
        currentMatch = null;
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

        socket.emit('send_match', parsedMatch);
        currentMatch = parsedMatch;
    }
    function emptyNextMatch(): NewMatch {
        return { matchKey: '', red: ['', '', ''], blue: ['', '', ''] };
    }
    function parseNextMatch(): Match | null {
        const red = nextMatch.red.map((key) => {
            return { status: 'Unassigned', teamKey: parseInt(key) };
        }) satisfies Robot[];
        const blue = nextMatch.blue.map((key) => {
            return { status: 'Unassigned', teamKey: parseInt(key) };
        }) satisfies Robot[];

        for (let i = 0; i < 3; i++) {
            if (
                red[i] === undefined ||
                blue[i] === undefined ||
                !red[i].teamKey ||
                !blue[i].teamKey
            ) {
                alert('Bad upcoming match');
                console.error(nextMatch);
                return null;
            }
        }

        const parsed = {
            matchKey: nextMatch.matchKey,
            red: [red[0], red[1], red[2]],
            blue: [blue[0], blue[1], blue[2]]
        } satisfies Match;

        return parsed;
    }

    function filter(n: number): string {
        if (!n) {
            return '-';
        }
        return n.toString();
    }

    const eventKey = '2026week0';

    // For api stuff
    let _matchKey = $derived(eventKey + '_' + (currentMatch?.matchKey ?? ''));

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

    /// Loads the teams from the next match into the admin page
    async function loadMatch() {
        const res = await fetch(`/api/load/match?key=${nextMatch.matchKey}`);

        // TODO Finish in the morning
    }

    /// Loads teams from an event to a DB
    async function loadTeamsToDB() {
        await fetch('/api/load/event', {
            method: 'POST',
            body: event_key
        });
    }
</script>

<div class="mx-2 mt-2 grid grid-cols-3 gap-2 text-white">
    <div class="flex flex-col gap-2">
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
                {#each nextMatch.red as _, i (i)}
                    <input
                        class="bg-first-red h-12 rounded p-2"
                        bind:value={nextMatch.red[i]}
                        placeholder="Red{i + 1}"
                    />
                {/each}
                {#each nextMatch.blue as _, i (i)}
                    <input
                        class="bg-first-blue h-12 rounded p-2"
                        bind:value={nextMatch.blue[i]}
                        placeholder="Blue{i + 1}"
                    />
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
                {#if currentMatch === null}
                    {#each Array(3) as _, i (i)}
                        <div class="grid grid-rows-2 gap-2">
                            <button
                                class="bg-eerie-black grid h-12 grid-cols-2 place-items-center rounded p-2"
                                >-
                                <div class="bg-first-red size-6 rounded-full"></div>
                            </button>
                            <button
                                class="bg-eerie-black grid h-12 grid-cols-2 place-items-center rounded p-2"
                                >-
                                <div class="bg-first-blue size-6 rounded-full"></div>
                            </button>
                        </div>
                    {/each}
                {:else}
                    {#each currentMatch.red as tm, i (i)}
                        <button
                            class="{getColor(
                                tm.status
                            )} grid h-12 grid-cols-2 place-items-center rounded p-2"
                            >{filter(tm.teamKey)}
                            <div class="bg-first-red size-6 rounded-full"></div>
                        </button>
                    {/each}
                    {#each currentMatch.blue as tm, i (i)}
                        <button
                            class="{getColor(
                                tm.status
                            )} grid h-12 grid-cols-2 place-items-center rounded p-2"
                            >{filter(tm.teamKey)}
                            <div class="bg-first-blue size-6 rounded-full"></div>
                        </button>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
        <div class="bg-gunmetal flex flex-col rounded p-2">
            <span class="text-center">Scout Queue</span>
            <div class="grid gap-2 p-2">
                {#each scouts as scout (scout)}
                    <button
                        class="bg-eerie-black rounded p-1 text-center"
                        onclick={() => removeScout(scout)}>{scout}</button
                    >
                {/each}
            </div>
        </div>
        <div class="bg-gunmetal flex flex-col gap-2 rounded p-2">
            <button onclick={clearRobots} class="bg-eerie-black rounded p-2">Clear Robots</button>
            <hr class="text-gray-500" />
            <input
                class="bg-eerie-black rounded p-2"
                type="text"
                bind:value={event_key}
                placeholder="Event Key"
            />
            <button class="bg-eerie-black rounded p-2" onclick={loadTeamsToDB}
                >Load New Event</button
            >
        </div>
    </div>
</div>
