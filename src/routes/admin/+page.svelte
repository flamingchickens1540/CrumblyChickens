<script lang="ts">
    import { io, type Socket } from 'socket.io-client';

<<<<<<< Updated upstream
    const username = 'Autumn';
    const socket: Socket = io('/admin', { auth: { username } });
    let scouts: string[] = $state([]);
    let robots: { teamKey: number; color: 'red' | 'blue' }[] = $state([]);
    socket.on(
        'handshake_data',
        ([scoutQueue, robotQueue]: [string[], { teamKey: number; color: 'red' | 'blue' }[]]) => {
            console.log(scouts);
            scouts = scoutQueue;
            robots = robotQueue;
        }
    );
    socket.on('scout_joined_queue', (username) => scouts.push(username));
    socket.on('scout_recieved_robot', (robot, username) => {
        robots.splice(robots.indexOf(robot), 1);
        scouts.splice(scouts.indexOf(username), 1);
    });
    function clearRobots() {
        socket.emit('clear_robots');
    }
    function removeScout(username: string) {
        scouts.splice(scouts.indexOf(username), 1);
        socket.emit('remove_scout', username);
    }
    function sendMatch() {
        const match: { teamKey: number; color: 'red' | 'blue' }[] = [
            { teamKey: 1540, color: 'red' },
            { teamKey: 2910, color: 'blue' },
            { teamKey: 2056, color: 'red' },
            { teamKey: 254, color: 'red' },
            { teamKey: 1678, color: 'blue' },
            { teamKey: 4043, color: 'blue' }
        ];
        socket.emit('send_match', match);
        robots = match;
    }
</script>

<div class="flex flex-col text-white">
    <button onclick={clearRobots}> Clear Robots </button>
    <button onclick={sendMatch}>Send Match</button>
    {#each scouts as scout (scout)}
        <button onclick={() => removeScout(scout)}>{scout}</button>
    {/each}
    {#each robots as robot (robot.teamKey)}
        {robot.teamKey}
        <br />
    {/each}
=======
	let username = $state('Azalea');
	const socket: Socket = io('/admin', { auth: { username } });
	let scouts: string[] = $state([]);
	let robots: { teamKey: string; color: 'red' | 'blue' }[] = $state([
        {
            teamKey: "", color: 'blue'
        },
        {
            teamKey: "", color: 'blue'
        },
        {
            teamKey: "", color: 'blue'
        },
        {
            teamKey: "", color: 'red'
        },
        {
            teamKey: "", color: 'red'
        },
        {
            teamKey: "", color: 'red'
        }
    ]);
	socket.on(
		'handshake_data',
		([scoutQueue, robotQueue]: [string[], { teamKey: number; color: 'red' | 'blue' }[]]) => {
			scouts = scoutQueue;
			robots = robotQueue.map(({ teamKey, color }) => {
                return {
                    teamKey: teamKey.toString(),
                    color
                }
            });
		}
	);
	socket.on('scout_joined_queue', (username) => scouts.push(username));
	socket.on('scout_recieved_robot', (robot, username) => {
		robots.splice(robots.indexOf(robot), 1);
		scouts.splice(scouts.indexOf(username), 1);
	});

	function clearRobots() {
		socket.emit('clear_robots');
	}

	function removeScout(username: string) {
		scouts.splice(scouts.indexOf(username), 1);
		socket.emit('remove_scout', username);
	}

	function sendMatch() {
        let failed = false
		const match: { teamKey: number; color: 'red' | 'blue' }[] = robots.map(({ teamKey, color }) => {
            let key = 0
            try {
                key = +teamKey
            } catch {
                failed = true
            }

            return {
                teamKey: key,
                color,
            }
        });
        console.log("here")

        if (failed) {
            alert("Invalid TeamKey")
            return
        }

		socket.emit('send_match', match);
        // NOTE
        // IDK what this was for
		// robots = match;
	}
</script>

<div class="flex flex-col text-white m-2 gap-4">
<h1 class="font-extrabold flex items-baseline gap-2">
  <span>Welcome</span>
  <input
    bind:value={username}
    class="font-extrabold w-auto min-w-[6ch]"
  />
</h1>
    <button onclick={clearRobots} class="p-2 outline rounded">Clear Robots</button>
	<button onclick={sendMatch} class="p-2 outline rounded">Send Match</button>
	{#each scouts as scout}
		<button onclick={() => removeScout(scout)}>{scout}</button>
	{/each}
	<div class="grid grid-cols-2 gap-2">
        <div class="grid grid-cols-1 grid-rows-3 gap-2">
            <input type="text" bind:value={robots[0].teamKey} class="bg-blue-500 p-2 rounded">
            <input type="text" bind:value={robots[1].teamKey} class="bg-blue-500 p-2 rounded">
            <input type="text" bind:value={robots[2].teamKey} class="bg-blue-500 p-2 rounded">
        </div>
        <div class="grid grid-cols-1 grid-rows-3 gap-2">
            <input type="text" bind:value={robots[3].teamKey} class="bg-red-500 p-2 rounded">
            <input type="text" bind:value={robots[4].teamKey} class="bg-red-500 p-2 rounded">
            <input type="text" bind:value={robots[5].teamKey} class="bg-red-500 p-2 rounded">
        </div>
    </div>
>>>>>>> Stashed changes
</div>
