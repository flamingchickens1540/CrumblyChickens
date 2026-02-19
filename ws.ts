import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';

const info = (s: string) => console.log(`\x1b[32m${s}\x1b[0m`);
const warn = (s: string) => console.log(`\x1b[33m${s}\x1b[0m`);

let robotQueue: { teamKey: number; color: 'red' | 'blue' }[] = [];

const wsServer = {
	name: 'wsServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;
		const io = new Server(server.httpServer);
		io.on('connect', (socket) => {
			if (!socket.handshake.auth.username) {
				warn(`User joined without username. Disconnecting. Socket id: ${socket.id}`);
				socket.disconnect();
				return;
			}
			// Send out a match
		});
		io.of('/queue').on('connect', (socket) => {
			const robot = robotQueue.pop();
			if (robot !== undefined) {
				info(`${socket.handshake.auth.username} recieved robot ${robot?.teamKey}`);
				socket.emit('recieve_robot', robot);
				io.of('/admin').emit('scout_recieved_robot', [robot, socket.handshake.auth.username]);
			} else {
				info(`${socket.handshake.auth.username} joined scout queue`);
			}

			socket.on('leave_queue', () => {
				// Hmmmmm
				socket.leave('queue');
				io.to('admin').emit('scout_left_queue', socket.handshake.auth.username);
			});
			socket.on('submit_match', () => {});
			socket.on('disconnect', async (_) => {
				io.to('admin').emit('scout_left_queue', socket.handshake.auth.username);
			});
		});
		io.of('/admin').on('connect', (socket) => {
			const scoutQueue = io
				.of('/queue')
				.sockets.values()
				.map((scout) => scout.handshake.auth.username);

			socket.emit('handshake_data', [scoutQueue, robotQueue]);

			socket.on('clear_robots', () => {
				info(`Robot queue cleared. Was ${robotQueue}`);
				robotQueue = [];
			});
			socket.on('send_match', (robots: { teamKey: number; color: 'red' | 'blue' }[]) => {
				robotQueue = robots;
				const scouts = io.of('/queue');

				for (const scout of scouts.sockets.values()) {
					const robot = robotQueue.pop();
					if (robot === undefined) {
						break;
					}
					scout.emit('recieve_robot', robot);
					io.of('/admin').emit('scout_recieved_robot', [robot, scout.handshake.auth.username]);
					info(`${scout.handshake.auth.username} recieved robot ${robot.teamKey} from queue`);
				}
			});
		});
	}
};

export default wsServer;
