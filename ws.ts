import { type ViteDevServer } from 'vite';
import { Server, type DisconnectReason } from 'socket.io';
import { spawn } from 'child_process';
import type { Match } from '@/types';

const info = (s: string) => console.log(`\x1b[32m${s}\x1b[0m`);
const warn = (s: string) => console.log(`\x1b[33m${s}\x1b[0m`);

let currentMatch: Match | null = null;
let matchIdx = 0;

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
        });
        io.of('/queue').on('connect', (socket) => {
            const robot = getNextTeam(socket.handshake.auth.username);
            if (robot !== undefined) {
                info(`${socket.handshake.auth.username} recieved robot ${robot.teamKey}`);
                socket.emit('recieve_robot', { robot, matchKey: currentMatch!.matchKey });
                socket.disconnect();
                // Technically, all this does is update currentMatch
                io.of('/admin').emit('scout_recieved_robot', [
                    currentMatch,
                    socket.handshake.auth.username
                ]);
            } else {
                io.of('/admin').emit('scout_joined_queue', socket.handshake.auth.username);
                info(`${socket.handshake.auth.username} joined scout queue`);
            }

            socket.on('disconnect', async (reason: DisconnectReason) => {
                switch (reason) {
                    case 'client namespace disconnect': {
                        info(`${socket.handshake.auth.username} left queue`);
                        break;
                    }
                    case 'transport error':
                    case 'transport close':
                    case 'parse error':
                    case 'forced close': {
                        info(
                            `${socket.handshake.auth.username} disconnected because of a ${reason}`
                        );
                    }
                }
                io.of('admin').emit('scout_left_queue', socket.handshake.auth.username);
            });
        });
        io.of('/admin').on('connect', (socket) => {
            const scoutQueue: string[] = io
                .of('/queue')
                .sockets.values()
                .map((scout) => scout.handshake.auth.username)
                .toArray();
            info(`Admin aquired: ${socket.handshake.auth.username}`);

            socket.emit('handshake_data', [scoutQueue, currentMatch]);

            socket.on('clear_robots', () => {
                info(`Current match cleared ${formatMatch()}`);
                currentMatch = null;
            });
            socket.on('remove_scout', (username: string) => {
                const scouts = io.of('/queue').sockets.values();
                for (const scout of scouts) {
                    if (username === scout.handshake.auth.username) {
                        scout.disconnect();
                        info(`${username} removed from queue by admin`);
                        return;
                    }
                }
                warn(`Attempted to remove a scout who wasn't in the queue: ${username}`);
            });
            socket.on('send_match', (match: Match) => {
                const script = spawn('python3', ['export/data_export.py']);

                script.stdout.on('data', (data) => {
                    console.log(`Exported: ${data}`);
                });

                script.stderr.on('data', (data) => {
                    console.error(`Error Exporting: ${data}`);
                });
                matchIdx = 0;
                currentMatch = match;
                const scouts = io.of('/queue');
                info(`New Match ${formatMatch()}`);

                for (const scout of scouts.sockets.values()) {
                    const robot = getNextTeam(scout.handshake.auth.username);
                    if (robot === undefined) {
                        break;
                    }
                    scout.emit('recieve_robot', {
                        robot,
                        matchKey: match.matchKey
                    });
                    info(
                        `${scout.handshake.auth.username} recieved robot ${robot.teamKey} from queue`
                    );
                    scout.disconnect();
                }
                io.of('/admin').emit('handshake_data', [
                    io
                        .of('/queue')
                        .sockets.values()
                        .map((scout) => scout.handshake.auth.username)
                        .toArray(),
                    currentMatch
                ]);
            });
        });
    }
};

function getNextTeam(scout: string): { teamKey: number; color: 'red' | 'blue' } | undefined {
    let teamKey;
    if (currentMatch === null) {
        return undefined;
    }

    console.log(currentMatch);
    let color: 'red' | 'blue' | undefined;
    if (matchIdx < 3) {
        teamKey = currentMatch.red[matchIdx].teamKey;
        currentMatch.red[matchIdx] = {
            status: 'Pending',
            teamKey,
            scout
        };
        color = 'red';
    } else if (matchIdx < 6) {
        teamKey = currentMatch.blue[matchIdx - 3].teamKey;
        currentMatch.red[matchIdx - 3] = {
            status: 'Pending',
            teamKey,
            scout
        };
        color = 'blue';
    }
    matchIdx++;
    if (teamKey !== undefined && color !== undefined) {
        return { teamKey, color };
    }
}

function formatMatch(): string {
    if (currentMatch === null) {
        return 'match previously cleared';
    }
    return (
        currentMatch.matchKey +
        ': ' +
        currentMatch.red.map((red) => ` \x1b[31m${red.teamKey}\x1b[0m`).join() +
        '\n' +
        currentMatch.blue.map((blue) => ` \x1b[34m${blue.teamKey}\x1b[0m`).join()
    );
}
export default wsServer;
