import { type ViteDevServer } from "vite";
import { Server } from "socket.io";
import { spawn } from "child_process";

const info = (s: string) => console.log(`\x1b[32m${s}\x1b[0m`);
const warn = (s: string) => console.log(`\x1b[33m${s}\x1b[0m`);

let match_key = "";
let robotQueue: { teamKey: number; color: "red" | "blue" }[] = [];

const wsServer = {
    name: "wsServer",
    configureServer(server: ViteDevServer) {
        if (!server.httpServer) return;
        const io = new Server(server.httpServer);
        io.on("connect", (socket) => {
            if (!socket.handshake.auth.username) {
                warn(
                    `User joined without username. Disconnecting. Socket id: ${socket.id}`,
                );

                socket.disconnect();
                return;
            }
        });
        io.of("/queue").on("connect", (socket) => {
            const robot = robotQueue.pop();
            if (robot !== undefined) {
                info(
                    `${socket.handshake.auth.username} recieved robot ${robot?.teamKey}`,
                );
                socket.emit("recieve_robot", { robot, match_key });
                socket.disconnect();
                io.of("/admin").emit("scout_recieved_robot", [
                    robot,
                    socket.handshake.auth.username,
                ]);
            } else {
                io.of("/admin").emit(
                    "scout_joined_queue",
                    socket.handshake.auth.username,
                );
                info(`${socket.handshake.auth.username} joined scout queue`);
            }

            socket.on("leave_queue", () => {
                socket.disconnect();
            });
            socket.on("disconnect", async (_) => {
                info(`${socket.handshake.auth.username} left queue`);
                io.to("admin").emit(
                    "scout_left_queue",
                    socket.handshake.auth.username,
                );
            });
        });
        io.of("/admin").on("connect", (socket) => {
            const scoutQueue = [
                ...io
                    .of("/queue")
                    .sockets.values()
                    .map((scout) => scout.handshake.auth.username),
            ];
            info(`Admin aquired: ${socket.handshake.auth.username}`);

            socket.emit("handshake_data", [scoutQueue, robotQueue]);

            socket.on("clear_robots", () => {
                info(`Robot queue cleared. Was ${robotQueue}`);
                robotQueue = [];
            });
            socket.on("remove_scout", (username: string) => {
                const scouts = io.of("/queue").sockets.values();
                for (const scout of scouts) {
                    if (username === scout.handshake.auth.username) {
                        scout.emit("leave_queue");
                        info(`${username} removed from queue by admin`);
                    }
                }
                warn(
                    `Attempted to remove a scout who wasn't in the queue: ${username}`,
                );
            });
            socket.on(
                "send_match",
                (match: {
                    teams: { teamKey: number; color: "red" | "blue" }[];
                    key: string;
                }) => {
                    const script = spawn("python3", ["export/data_export.py"]);

                    script.stdout.on("data", (data) => {
                        console.log(`Exported: ${data}`);
                    });

                    script.stderr.on("data", (data) => {
                        console.error(`Error Exporting: ${data}`);
                    });

                    match_key = match.key;
                    robotQueue = match.teams;

                    const scouts = io.of("/queue");
                    const formattedTeams: string = match.teams
                        .map((team) => {
                            if (team.color == "red") {
                                return ` \x1b[31m${team.teamKey}\x1b[0m`;
                            } else {
                                return ` \x1b[34m${team.teamKey}\x1b[0m`;
                            }
                        })
                        .join();
                    info(`New Match:${formattedTeams}`);

                    for (const scout of scouts.sockets.values()) {
                        const robot = robotQueue.pop();
                        if (robot === undefined) {
                            break;
                        }
                        scout.emit("recieve_robot", {
                            robot,
                            match_key,
                        });
                        io.of("/admin").emit("scout_recieved_robot", [
                            robot,
                            scout.handshake.auth.username,
                        ]);
                        info(
                            `${scout.handshake.auth.username} recieved robot ${robot.teamKey} from queue`,
                        );
                        scout.disconnect();
                    }
                },
            );
        });
    },
};

export default wsServer;
