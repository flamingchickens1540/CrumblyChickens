<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { io, type Socket } from 'socket.io-client';

	const username = 'Autumn';
	const socket: Socket = io('/queue', {
		auth: {
			username
		}
	});

	socket.on('leave_queue', () => {
		socket.disconnect();
		goto('/');
	});
	socket.on('recieve_robot', (_robot: { teamKey: number; color: 'red' | 'blue' }) => {
		browser && localStorage.setItem('matchData', ''); // TODO: connect to match scouting data
		socket.disconnect();
		goto('/matchscout');
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
			goto('/');
		}}
	>
		<p class="font-[Poppins] text-4xl font-semibold text-white">Scout</p>
	</button>
</div>
