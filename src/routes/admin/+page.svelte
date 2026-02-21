<script lang="ts">
    import { io, type Socket } from 'socket.io-client';

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

    import MatchDisplay from './MatchDisplay.svelte';
</script>

<div class="grid grid-cols-3">
    <MatchDisplay></MatchDisplay>
</div>
